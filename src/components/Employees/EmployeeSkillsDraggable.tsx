import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { Experience, Skill } from '../../types'
import Section from '../UI/Section'
import Button from '../UI/Button'
import SkillTag from '../Skills/SkillTag'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import { getFirstWord } from '../../utils/cypress'
import { getLevelName } from '../../utils/getLevelName'
import { Level } from '../../types/graphql'

type ExperiencePick = {
  id: Experience['id']
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  level: Level
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
    .slice()
    .sort((one, two) => (one > two ? -1 : 1))
    .map(i => i.id)
    .toString()

interface LevelSectionProps {
  level: Level
  experiences: ExperiencePick[]
  editable: boolean
  onGroupUpdate: (skill: string[], level: Level) => void
}

function LevelSection({ level, experiences, editable, onGroupUpdate }: LevelSectionProps) {
  const [skills, setSkills] = useState(experiences.filter(i => i.level === level).map(i => i.skill))
  const [edit, toggleEdit] = useState(false)

  useEffect(() => {
    const newSkills = experiences
      .filter(i => i.level === level && skills.map(skill => skill.id).includes(i.skill.id))
      .map(i => i.skill)
      .concat(skills.filter(e => !experiences.map(e => e.skill?.id).includes(e?.id)))
    // update only if element was added or removed
    if (skills.toString() !== newSkills.toString()) {
      setSkills(newSkills)
    }
    // eslint-disable-next-line
  }, [experiences])

  const filteredExperiences = experiences.filter(e => e.level === level)

  return (
    <Section
      title={
        <div data-cy={`Title ${getLevelName(level)}`}>
          {getLevelName(level)}{' '}
          {editable && (
            <Button
              size="small"
              icon={edit ? <CheckOutlined /> : <EditOutlined />}
              type="link"
              onClick={() => {
                if (edit) {
                  onGroupUpdate(
                    skills.map(i => i.id),
                    level,
                  )
                }
                toggleEdit(!edit)
              }}
            />
          )}
        </div>
      }
      key={level}
    >
      {!edit && (
        <Droppable droppableId={level} direction="horizontal" isDropDisabled={!editable}>
          {(provided: any, snapshot: any) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              data-cy={getFirstWord(level)}
            >
              {!filteredExperiences.length && (
                <div data-cy={`no${getFirstWord(level)}`}>No skills yet</div>
              )}
              {filteredExperiences
                .slice()
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
                        data-cy="skills_name"
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
          disabledSkills={experiences.filter(i => i.level !== level).map(i => i.skill?.id)}
          onChange={(items: any) => {
            setSkills(items)
          }}
        />
      )}
    </Section>
  )
}

interface Props {
  levels: Level[]
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
            const level = levels.find(i => i === destination.droppableId) || i.level
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
            key={level}
            level={level}
            experiences={experiences}
            onGroupUpdate={props.onGroupUpdate}
          />
        )
      })}
    </DragDropContext>
  )
}
