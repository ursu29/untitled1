import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import getMatrix from '../../queries/getMatrix'
import { Matrix, MatrixGrade, MatrixGroup, Skill } from '../../types'
import SkillSelect from '../Skills/SkillSelect'
import Button from '../UI/Button'
import message from '../../message'

const mutation = gql`
  mutation CreateMatrixSkill($input: CreateMatrixSkillInput) {
    createMatrixSkill(input: $input) {
      id
    }
  }
`

type MutationType = {
  createMatrixSkill: {
    id: string
  }
}

interface Props {
  matrix?: Matrix
  grade: MatrixGrade
  group: MatrixGroup
}

type SkillPick = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>

const SkillSelector = ({ onSelect }: { onSelect: (skill: SkillPick) => any }) => {
  const [adding, toggleAdding] = useState(false)
  if (adding) {
    return (
      <SkillSelect
        allowAddNew
        autoFocus
        matrixSkillsOnly
        onBlur={() => {
          toggleAdding(false)
        }}
        onSelect={(skill: SkillPick) => {
          toggleAdding(false)
          onSelect(skill)
        }}
      />
    )
  }
  return (
    <Button type="dashed" onClick={() => toggleAdding(true)}>
      Add skill
    </Button>
  )
}

export default function CreateMatrixSkill({ matrix, grade, group }: Props) {
  const [mutate, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrix, variables: { input: { id: matrix?.id } } }],
    onError: message.warning,
    onCompleted: () => message.success('Skill is added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating')
    }
  })

  if (!matrix) return null
  return (
    <SkillSelector
      onSelect={skill => {
        mutate({
          variables: {
            input: {
              matrixId: matrix.id,
              skillId: skill.id,
              gradeId: grade.id,
              groupId: group.id,
            },
          },
        })
      }}
    />
  )
}
