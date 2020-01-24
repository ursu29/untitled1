import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee, Matrix } from '../../types'
import EmployeeSkillExperience from '../Employees/EmployeeMatrixExperience'
import Controls from '../UI/Controls'
import MatrixWithExperiences from '../UI/MatrixWithExperiences'
import Skeleton from '../UI/Skeleton'

interface Props {
  matrix: Matrix
  employee: Pick<Employee, 'id'>
  DetachMatrix: React.FC<{
    employee?: Pick<Employee, 'id'>
    matrix: Pick<Matrix, 'id'>
  }>
  ExportMatrixToExcel: any
}

export default function EmployeeMatrix({ employee, matrix, DetachMatrix }: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee.id } },
  })

  return (
    <Skeleton active loading={loading}>
      <MatrixWithExperiences
        matrix={matrix}
        employee={data?.employees[0]}
        EmployeeSkillExperience={EmployeeSkillExperience}
      />
      <Controls>
        <DetachMatrix matrix={matrix} employee={employee} />
      </Controls>
    </Skeleton>
  )
}
