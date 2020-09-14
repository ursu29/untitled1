import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { Level, Experience, Skill } from '../../types'
import Section from '../UI/Section'
import Button from '../UI/Button'
import SkillTag from '../Skills/SkillTag'
import SkillTreeSelect from '../Skills/SkillTreeSelect'

type ExperiencePick = {
  id: Experience['id']
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  level: Pick<Level, 'id'>
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  paddingLeft: isDragging ? '8px' : 0,
  background: isDragging ? 'lightgreen' : 'none',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver: boolean): any => ({
  background: isDraggingOver ? 'lightgray' : 'none',
  display: 'flex',
  overflow: 'hidden',
  flexWrap: 'wrap',
  maxWidth: '100%',
  minHeight: '32px',
})

const sortMapStringify = (items: ExperiencePick[]) =>
  items
    .sort((one, two) => (one > two ? -1 : 1))
    .map(i => i.id)
    .toString()

interface LevelSectionProps {
  level: Pick<Level, 'id' | 'name'>
  experiences: ExperiencePick[]
  editable: boolean
  onGroupUpdate: (skill: string[], level: string) => void
}

function LevelSection({ level, experiences, editable, onGroupUpdate }: LevelSectionProps) {
  const [skills, setSkills] = useState(
    experiences.filter(i => i.level?.id === level.id).map(i => i.skill),
  )
  const [edit, toggleEdit] = useState(false)

  useEffect(() => {
    const newSkills = experiences
      .filter(i => i.level?.id === level?.id && skills.map(skill => skill.id).includes(i.skill.id))
      .map(i => i.skill)
      .concat(skills.filter(e => !experiences.map(e => e.skill?.id).includes(e?.id)))
    // update only if element was added or removed
    if (skills.toString() !== newSkills.toString()) {
      setSkills(newSkills)
    }
    // eslint-disable-next-line
  }, [experiences])

  const filteredExperiences = experiences.filter(e => e.level?.id === level.id)

  return (
    <Section
      title={
        <div>
          {level.name}{' '}
          {editable && (
            <Button
              size="small"
              icon={edit ? <CheckOutlined /> : <EditOutlined />}
              type="link"
              onClick={() => {
                if (edit) {
                  onGroupUpdate(
                    skills.map(i => i.id),
                    level.id,
                  )
                }
                toggleEdit(!edit)
              }}
            />
          )}
        </div>
      }
      key={level.id}
    >
      {!edit && (
        <Droppable droppableId={level.id} direction="horizontal" isDropDisabled={!editable}>
          {(provided: any, snapshot: any) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {!filteredExperiences.length && <div>No skills yet</div>}
              {filteredExperiences
                .sort((one, two) => (one.skill.name > two.skill.name ? 1 : -1))
                .map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={!editable}
                  >
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <SkillTag style={{ cursor: 'grab' }} skill={item.skill} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      {edit && (
        <SkillTreeSelect
          isIncludeMatrixSkills={false}
          value={skills}
          disabledSkills={experiences.filter(i => i.level?.id !== level?.id).map(i => i.skill?.id)}
          onChange={(items: any) => {
            setSkills(items)
          }}
        />
      )}
    </Section>
  )
}

interface Props {
  levels: Pick<Level, 'id' | 'name' | 'index'>[]
  experiences: ExperiencePick[]
  editable: boolean
  onMoveSkill: (skill: string, level: string) => void
  onGroupUpdate: (skill: string[], level: string) => void
  SkillTreeSelect?: any
}

export default function EmployeeSkillsDraggable({
  levels,
  SkillTreeSelect,
  editable,
  ...props
}: Props) {
  const [experiences, setExperiences] = useState(props.experiences)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId !== destination.droppableId) {
      setExperiences(
        experiences.map(i => {
          if (i.id === result.draggableId) {
            const level = levels.find(i => i.id === destination.droppableId) || i.level
            return { ...i, level }
          }
          return i
        }),
      )
      props.onMoveSkill(result.draggableId, destination.droppableId)
    }
  }

  useEffect(() => {
    // update only if element was added or removed
    if (sortMapStringify(experiences) !== sortMapStringify(props.experiences)) {
      setExperiences(props.experiences)
    }
    // eslint-disable-next-line
  }, [props.experiences])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {levels.map(level => {
        return (
          <LevelSection
            editable={editable}
            key={level.id}
            level={level}
            experiences={experiences}
            onGroupUpdate={props.onGroupUpdate}
          />
        )
      })}
    </DragDropContext>
  )
}
