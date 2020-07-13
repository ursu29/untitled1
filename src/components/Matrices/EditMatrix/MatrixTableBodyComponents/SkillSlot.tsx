import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { MatrixCell, DragMarker } from '../../styled'
import { Matrix, MatrixSkill } from '../../../../types'

interface Props {
  dragProps: any
  skill: MatrixSkill
  matrix?: Matrix
  DeleteMatrixSkill: any
}

export default function SkillSlot({ dragProps, skill, matrix, DeleteMatrixSkill }: Props) {
  if (!matrix) return null

  const editable = matrix.access.write

  return (
    <>
      <DragMarker {...dragProps}>
        {[0, 1].map((_, i) => (
          <MoreOutlined
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '15px',
              width: '6px',
              padding: 0,
              color: '#b7b7b7',
            }}
          />
        ))}
      </DragMarker>
      <MatrixCell key={skill.id}>
        <DeleteMatrixSkill skill={skill} matrix={matrix} editable={editable} />
      </MatrixCell>
    </>
  )
}
