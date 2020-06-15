import React from 'react'
import { MatrixGrade, MatrixGroup, MatrixRow } from '../styled'
import { Matrix } from '../../../types'

interface Props {
  matrix: Matrix
  CreateMatrixGroup: any
  CreateMatrixGrade: any
}

export default function MatrixTableHead({ matrix, CreateMatrixGroup, CreateMatrixGrade }: Props) {
  if (!matrix) return null

  const { grades } = matrix.body
  const editable = matrix.access.write

  return (
    <MatrixRow>
      <MatrixGroup
        style={{
          minWidth: '130px',
          maxWidth: '130px',
          margin: '0 20px 0 0',
        }}
      >
        {editable && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <div style={{ alignSelf: 'flex-end', marginBottom: '15px', marginRight: '20px' }}>
              <CreateMatrixGrade matrix={matrix} />
            </div>
            <div style={{ alignSelf: 'flex-start' }}>
              <CreateMatrixGroup matrix={matrix} />
            </div>
          </div>
        )}
      </MatrixGroup>
      {grades.map(grade => (
        <MatrixGrade key={grade.id} style={{ fontSize: '18px' }}>
          {grade.title}
        </MatrixGrade>
      ))}
    </MatrixRow>
  )
}
