import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee, Matrix } from '../../types'
import EmployeeSkillExperience from '../Employees/EmployeeMatrixExperience'
import Controls from '../UI/Controls'
import MatrixWithExperiences from '../Matrices/MatrixWithExperiences'
import Skeleton from '../UI/Skeleton'
import DetachMatrix from './DetachMatrix'

interface Props {
  matrix: Matrix
  employee: Pick<Employee, 'id'>
}

export default function EmployeeMatrix({ employee, matrix }: Props) {
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
