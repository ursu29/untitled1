import React from 'react'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import EmployeeCard from '../UI/EmployeeCard'

const query = gql`
  query GetEmployeeManager($input: EmployeesInput) {
    employees(input: $input) {
      id
      manager {
        id
        name
        position
        country
        location
        phoneNumber
        email
        avatar
        bonuses
        status
        isMe
      }
    }
  }
`

type EmployeePick = Pick<
  Employee,
  | 'id'
  | 'name'
  | 'position'
  | 'avatar'
  | 'bonuses'
  | 'country'
  | 'email'
  | 'isMe'
  | 'location'
  | 'status'
  | 'phoneNumber'
>

interface Props {
  employee?: {
    id: Employee['id']
  }
}

export default function EmployeeManager(props: Props) {
  const { data, loading, error } = useQuery<{
    employees: { id: Employee['id']; manager: EmployeePick }[]
  }>(query, {
    variables: { input: { id: props.employee?.id } },
    skip: !props.employee,
  })

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const employee = data?.employees?.[0]

  return <EmployeeCard loading={loading} employee={employee?.manager} />
}
