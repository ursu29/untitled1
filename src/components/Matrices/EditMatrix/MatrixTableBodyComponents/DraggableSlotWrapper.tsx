import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EmptySlot from './EmptySlot'
import SkillSlot from './SkillSlot'
import { Matrix } from '../../../../types'

interface Props {
  keyProp: string
  draggableId: string
  index: number
  isEmptySlot: boolean
  skill?: any
  matrix?: Matrix
  DeleteMatrixSkill?: any
}

export default function DraggableSlotWrapper({
  keyProp,
  draggableId,
  index,
  isEmptySlot,
  skill,
  matrix,
  DeleteMatrixSkill,
}: Props) {
  return (
    <Draggable key={keyProp} draggableId={draggableId} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '14px',
          }}
        >
          {isEmptySlot ? (
            <EmptySlot keyProp={keyProp} />
          ) : (
            <SkillSlot
              dragProps={provided.dragHandleProps}
              skill={skill}
              matrix={matrix}
              DeleteMatrixSkill={DeleteMatrixSkill}
            />
          )}
        </div>
      )}
    </Draggable>
  )
}
