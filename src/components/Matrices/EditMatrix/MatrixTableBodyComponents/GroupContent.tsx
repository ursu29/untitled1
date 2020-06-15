import React, { ReactChild } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { MatrixGrade } from '../../styled'

interface Props {
  gradeId: string
  content: any
  editable: boolean
  children: ReactChild
  onDragEnd: any
}

export default function GroupContent({ gradeId, content, editable, children, onDragEnd }: Props) {
  return (
    <MatrixGrade key={gradeId}>
      {!!content.length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={gradeId} isDropDisabled={!editable}>
            {(provided: any, snapshot: any) => (
              <div ref={provided.innerRef}>
                {content}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {editable && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '170px' }}>{children}</div>
      )}
    </MatrixGrade>
  )
}
