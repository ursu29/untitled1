import React from 'react'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import EmployeeView from '../UI/Employee'

interface Props {
  employee: Pick<Employee, 'id'>
}

const query = gql`
  query GetEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      position
      country
      location
      phoneNumber
      email
      avatar
      bonuses
      # schedule
      isMe
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
  | 'phoneNumber'
>

export default function EmployeeDetails(props: Props) {
  const { data, loading, error } = useQuery<{ employees: EmployeePick[] }>(query, {
    variables: { input: { id: props.employee.id } },
  })
  return null
  // return <EmployeeView loading={loading || !data} employee={data?.employees?.[0]} />
}
