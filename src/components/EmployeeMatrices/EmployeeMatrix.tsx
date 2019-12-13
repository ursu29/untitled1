import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Matrix, Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import MatrixWithExperiences from '../UI/MatrixWithExperiences'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrixExperience from './EmployeeMatrixExperience'

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
        EmployeeMatrixExperience={EmployeeMatrixExperience}
      />
    </Skeleton>
  )
}
