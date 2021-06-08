import React from 'react'
import { Tooltip } from 'antd'
import { MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { MatrixCell, DragMarker } from '../../styled'
import { Matrix, MatrixSkill } from '../../../../types'

interface Props {
  dragProps: any
  skill: MatrixSkill
  matrix?: Matrix
  DeleteMatrixSkill: any
  withProposal?: boolean
}

export default function SkillSlot({
  dragProps,
  skill,
  matrix,
  DeleteMatrixSkill,
  withProposal,
}: Props) {
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
      {withProposal && (
        <Tooltip placement="top" title="Has open proposals">
          <ExclamationCircleOutlined
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            style={{ marginLeft: '8px', color: '#ff6104', cursor: 'pointer' }}
          />
        </Tooltip>
      )}
    </>
  )
}
