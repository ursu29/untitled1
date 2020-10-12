import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import query, { QueryType } from '../../queries/getEmployeeManager'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeGroup from './EmployeeGroup.new'

interface Props {
  employeeEmail: Employee['email']
}

function EmployeeManager(props: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { email: props.employeeEmail },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  return (
    <Skeleton active avatar line loading={loading}>
      {employee?.agileManager && (
        <EmployeeGroup title="Agile manager" employees={[employee.agileManager]} />
      )}
    </Skeleton>
  )
}

export default EmployeeManager
