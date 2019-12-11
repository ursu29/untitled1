import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Employee, Matrix } from '../../types'
import gql from 'graphql-tag'
import EmployeeMatricesList from '../UI/EmployeeMatricesList'
import AttachMatrix from './AttachMatrix'
import Controls from '../UI/Controls'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'

interface Props {
  id: Employee['id']
}

export default function EmployeeMatrices({ id }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id } },
  })

  const employee = data?.employees?.[0]

  return (
    <>
      <Controls>
        <AttachMatrix employee={employee} />
      </Controls>
      <EmployeeMatricesList
        loading={loading}
        matrices={employee?.matrices}
        employee={employee}
        EmployeeMatrixComponent={() => <div>Employee matrix component</div>}
      />
    </>
  )
}
