import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Employee, Matrix } from '../../types'
import gql from 'graphql-tag'
import EmployeeMatricesList from '../UI/EmployeeMatricesList'

interface Props {
  id: Employee['id']
}

const query = gql`
  query getEmployeeMatrices($input: EmployeesInput) {
    employees(input: $input) {
      id
      matrices {
        id
        title
        description
      }
    }
  }
`

type QueryType = {
  employees: { id: Employee['id']; matrices: Pick<Matrix, 'id' | 'title' | 'description'>[] }[]
}

export default function EmployeeMatrices({ id }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { input: { id } },
  })

  const employee = data?.employees?.[0]

  return (
    <EmployeeMatricesList
      loading={loading}
      matrices={employee?.matrices}
      employee={employee}
      EmployeeMatrixComponent={() => <div>Employee matrix component</div>}
    />
  )
}
