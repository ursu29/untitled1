import { useMutation, gql } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import GroupTitle from './MatrixTableBodyComponents/GroupTitle'
import GroupContent from './MatrixTableBodyComponents/GroupContent'
import DraggableSlotWrapper from './MatrixTableBodyComponents/DraggableSlotWrapper'
import Divider from '../../UI/Divider'
import { MatrixRow } from '../styled'
import { Matrix, MatrixSkill } from '../../../types'
import getMatrix from '../../../queries/getMatrix'
import message from '../../../message'

const mutation = gql`
  mutation ReorderMatrixSkills($input: ReorderMatrixSkillsInput) {
    reorderMatrixSkills(input: $input)
  }
`

type MutationType = {
  updateMatrix: {
    id: string
  }
}

interface Props {
  matrix: Matrix
  CreateMatrixSkill: any
  DeleteMatrixSkill: any
}

export default function MatrixTableBody({ matrix, CreateMatrixSkill, DeleteMatrixSkill }: Props) {
  const { groups, grades } = matrix.body
  const editable = matrix.access.write

  const [skills, setSkills] = useState(matrix.body.skills)

  useEffect(() => setSkills(matrix.body.skills), [matrix])

  // Rows amount for each group assigned according to the maximum grades rows amount for that group
  const [groupsRowsAmount, setGroupsRowsAmount] = useState<{ [key: string]: number }>({})

  // For each group finding maximum grades skills rows amount and assigned it to that grade and set to state
  useEffect(() => {
    const groups: { [key: string]: { [key: string]: number } } = {}

    skills.forEach(skill => {
      groups[skill.groupId] = {
        ...groups?.[skill.groupId],
        [skill.gradeId]: (groups?.[skill.groupId]?.[skill.gradeId] || 0) + 1,
      }
    })

    const groupsMaxRows: { [key: string]: number } = {}

    Object.keys(groups).forEach(groupId => {
      groupsMaxRows[groupId] = Math.max.apply(null, Object.values(groups[groupId]))
    })

    setGroupsRowsAmount(groupsMaxRows)
  }, [skills])

  // Mutate - reordering matrix skills
  const [mutate] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrix, variables: { input: { id: matrix?.id } } }],
    onError: err => {
      setSkills(matrix.body.skills)
      return message.error(err)
    },
  })

  /**
   * Function for dragging elements
   *
   * - determine current column - skills from global list with the same
   *   group and grade as the dragging
   * - find previous element of the future dragging skill position
   * - add dragging element after previous in the global list
   *
   */
  const onDragEnd = async (result: DropResult) => {
    const destIndex = result.destination?.index

    // In case of wrong destination - return
    if ((!destIndex && destIndex !== 0) || destIndex === result.source.index) return

    const gradeId = result.source.droppableId
    const [groupId, chosenElementSkillId] = result.draggableId.split('/')

    // Determine current local skills column for specific group/grade without dragging element
    const currentColumn = skills.filter(
      skill =>
        skill.groupId === groupId &&
        skill.gradeId === gradeId &&
        skill.skill.id !== chosenElementSkillId,
    )

    // Determine dragging skill and it's index in the global skills list
    let chosenSkillIndex: number = -1
    const chosenSkill = skills.filter((e, index) => {
      if (e.skill.id === chosenElementSkillId) {
        chosenSkillIndex = index
        return true
      }
      return false
    })[0]

    // Global skills list without dragging skill
    const skillsWithoutChosen = skills.filter(e => e.skill.id !== chosenElementSkillId)

    // Amount of empty slots for inserting before dragging skill
    let emptySkillsAmount = 0

    // Mark if dragging skill is the first one in it's column
    let isFirstInColumn = false

    // Tailing empty slots-ids in the current column for removing
    const tailingEmptySkills: string[] = []

    // Reversing current column and counting tailing empty slots
    const reverseCurrentColumn = [...currentColumn].reverse()
    reverseCurrentColumn.some((skill, index) => {
      // Virtual tailing empty slot
      if (
        index === reverseCurrentColumn.length - destIndex ||
        destIndex >= reverseCurrentColumn.length
      )
        return true

      // Real empty slot for removing
      if (skill.type === 'space_boilerplate') {
        tailingEmptySkills.push(skill.id)
      } else return true
      return false
    })

    // Finding real existing previous skill id (not empty slot) at the current column
    // and mutate-filling the emptySkillsAmount list
    const prevElementSkillId = getPrevSkillId(destIndex)

    // New global skills list
    let newSkills: MatrixSkill[] = []

    // List of inserting empty slots before dragging skill
    let insertingEmptySlots: any[] = []

    // New dragging skill index
    let newIndex: number = -1

    // FILLING NEW SKILLS LIST
    // If destination index is not zero for the current column
    if (destIndex !== 0) {
      insertingEmptySlots = makeEmptySlots(emptySkillsAmount)

      if (chosenSkillIndex === 0 && isFirstInColumn) {
        // If dragging skill will be the first one in the global skills list
        newSkills = skillsWithoutChosen.filter(e => !tailingEmptySkills.includes(e.id))
        newSkills.unshift(chosenSkill)
        newSkills.unshift(...insertingEmptySlots)
        newIndex = 0
      } else {
        // If dragging skill will not be the first one in the global skills list
        skillsWithoutChosen
          .filter(e => !tailingEmptySkills.includes(e.id))
          .forEach((e, i) => {
            if (e.skill.id === prevElementSkillId) {
              newSkills.push(e)
              newSkills.push(...insertingEmptySlots)
              newSkills.push(chosenSkill)
              newIndex = i + 1
            } else {
              newSkills.push(e)
            }
          })
      }
    } else {
      // If destination is the first index in the current column
      newSkills = skillsWithoutChosen.filter(e => !tailingEmptySkills.includes(e.id))
      newSkills.unshift(chosenSkill)
      newIndex = 0
    }

    // Set new global skills list to the state
    setSkills(newSkills)

    // Make mutation
    try {
      await mutate({
        variables: {
          input: {
            matrixId: matrix.id,
            skillId: chosenElementSkillId,
            newIndex,
            insertingEmptySlotsIds: insertingEmptySlots.map(slot => slot.id),
            removingEmptySlotsIds: tailingEmptySkills,
          },
        },
      })
    } catch {}

    // UTILS
    // Recursive function for finding previous skill id
    function getPrevSkillId(destIndex: number): string | -1 {
      // If skill is the first one in the current column - must find previous in the global skills list
      if (destIndex === 0) {
        isFirstInColumn = true
        if (!skills[chosenSkillIndex - 1]) return -1 // skill is the first one in the global skills list
        return skills[chosenSkillIndex - 1].skill.id // found previous skill in the global skills list
      }

      // If before skill there is an empty slot in the current column
      if (!currentColumn[destIndex - 1] && destIndex !== 0) {
        emptySkillsAmount += 1
        return getPrevSkillId(destIndex - 1) // recursive call function for current empty slot
      }

      // Found previous skill in the current column
      return currentColumn[destIndex - 1].skill.id
    }

    // Function returning array of set quantity of empty slots
    function makeEmptySlots(number: number) {
      return Array(number)
        .fill(0)
        .map(_ => {
          const id = Math.random().toString(36).substr(2, 11)
          return {
            id,
            skill: { id: 'empty_' + id },
            type: 'space_boilerplate',
            groupId,
            gradeId,
          }
        })
    }
  }

  return (
    <>
      {groups.map(group => (
        <div key={group.id}>
          <Divider />

          <MatrixRow key={group.id}>
            <GroupTitle title={group.title} />

            {grades.map(grade => {
              const content = skills
                .filter(skill => skill.groupId === group.id && skill.gradeId === grade.id)
                .map(({ skill, type }, index) => (
                  <DraggableSlotWrapper
                    key={skill.id}
                    isEmptySlot={type === 'space_boilerplate'}
                    keyProp={skill.id}
                    draggableId={group.id + '/' + skill.id}
                    index={index}
                    skill={skill}
                    matrix={matrix}
                    DeleteMatrixSkill={DeleteMatrixSkill}
                  />
                ))

              if (content.length < groupsRowsAmount[group.id]) {
                content.push(
                  ...Array(groupsRowsAmount[group.id] - content.length)
                    .fill(0)
                    .map((e, index) => (
                      <DraggableSlotWrapper
                        key={content.length + 1 + index + ''}
                        isEmptySlot={true}
                        keyProp={content.length + 1 + index + ''}
                        draggableId={group.id + '/' + content.length + 1 + index}
                        index={content.length + index}
                      />
                    )),
                )
              }

              return (
                <GroupContent
                  key={grade.id}
                  editable={editable}
                  gradeId={grade.id}
                  content={content}
                  onDragEnd={onDragEnd}
                >
                  <CreateMatrixSkill grade={grade} group={group} matrix={matrix} />
                </GroupContent>
              )
            })}
          </MatrixRow>
        </div>
      ))}
    </>
  )
}
