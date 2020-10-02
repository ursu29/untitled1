import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import query, { QueryType } from '../../queries/getEmployeeManager'
import { Employee } from '../../types'
import Section from '../UI/Section'
import Skeleton from '../UI/Skeleton'
import EmployeeCard from './EmployeeCard'

interface Props {
  employee?: {
    id: Employee['id']
    email: Employee['email']
  }
}

export default function EmployeeManager(props: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { email: props.employee?.email },
    skip: !props.employee,
  })

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  return (
    <Skeleton active avatar line loading={loading}>
      {employee?.agileManager && (
        <Section title="Agile manager">
          <EmployeeCard email={employee.agileManager.email} employee={employee.agileManager} />
        </Section>
      )}
    </Skeleton>
  )
}
