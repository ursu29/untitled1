import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import { Employee } from '../../types'
import EmployeeView from '../UI/Employee'
import EmployeeManager from './EmployeeManager'
import EmployeeProjects from './EmployeeProjects'

interface Props {
  employee: Pick<Employee, 'id'>
}

const query = gql`
  query getEmployee($input: EmployeesInput) {
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
      status
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
  | 'status'
  | 'phoneNumber'
>

export default function EmployeeDetails(props: Props) {
  const { data, loading, error } = useQuery<{ employees: EmployeePick[] }>(query, {
    variables: { input: { id: props.employee.id } },
  })
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  if (error) return <div>Error :(</div>

  const employee = data?.employees?.[0]

  return (
    <EmployeeView
      mobile={!isLarge}
      loading={loading}
      employee={employee}
      manager={<EmployeeManager employee={props.employee} />}
      projects={<EmployeeProjects employee={props.employee} />}
    />
  )
}
