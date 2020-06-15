import React from 'react'
import { Skeleton } from 'antd'
import MatrixTableHead from './MatrixTableHead'
import MatrixTableBody from './MatrixTableBody'
import { Matrix } from '../../../types'

interface Props {
  loading: boolean
  matrix: Matrix
  CreateMatrixGroup: any
  CreateMatrixGrade: any
  CreateMatrixSkill: any
  DeleteMatrixSkill: any
}

const MatrixView = ({
  loading,
  matrix,
  CreateMatrixGroup,
  CreateMatrixGrade,
  CreateMatrixSkill,
  DeleteMatrixSkill,
}: Props) => {
  if (!loading && !matrix) return null
  return (
    <Skeleton active loading={loading}>
      <MatrixTableHead
        matrix={matrix}
        CreateMatrixGrade={CreateMatrixGrade}
        CreateMatrixGroup={CreateMatrixGroup}
      />

      <MatrixTableBody
        matrix={matrix}
        CreateMatrixSkill={CreateMatrixSkill}
        DeleteMatrixSkill={DeleteMatrixSkill}
      />
    </Skeleton>
  )
}

export default React.memo(MatrixView)
