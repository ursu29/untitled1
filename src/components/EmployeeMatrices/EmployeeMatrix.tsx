import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Matrix, Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import MatrixWithExperiences from '../UI/MatrixWithExperiences'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrixExperience from './EmployeeMatrixExperience'
import Controls from '../UI/Controls'
import Divider from '../UI/Divider'

interface Props {
  matrix: Matrix
  employee: Pick<Employee, 'id'>
  DetachMatrix: React.FC<{
    employee?: Pick<Employee, 'id'>
    matrix: Pick<Matrix, 'id'>
  }>
  ExportMatrixToExcel: any
}

export default function EmployeeMatrix({
  employee,
  matrix,
  DetachMatrix,
  ExportMatrixToExcel,
}: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee.id } },
  })

  return (
    <Skeleton active loading={loading}>
      <MatrixWithExperiences
        matrix={matrix}
        employee={data?.employees[0]}
        EmployeeMatrixExperience={EmployeeMatrixExperience}
      />
      <Controls>
        <DetachMatrix matrix={matrix} employee={employee} />
        <Divider type="vertical" />
        <ExportMatrixToExcel matrix={matrix} employee={data?.employees[0]} />
      </Controls>
    </Skeleton>
  )
}
