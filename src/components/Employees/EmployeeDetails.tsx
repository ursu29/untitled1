import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import { Employee } from '../../types'
import EmployeeView from './Employee'

import fragments, { EmployeeDetails } from '../../fragments'

interface Props {
  employee: Pick<Employee, 'id' | 'email'>
}

export const getEmployeeDetails = gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
      avatar
      agileManager {
        ...EmployeeDetails
      }
      bonuses
      status
    }
  }
  ${fragments.Employee.Details}
`

type EmployeePick = EmployeeDetails & {
  status: Employee['status']
  bonuses: Employee['bonuses']
  agileManager: EmployeeDetails
  avatar: Employee['avatar']
}

export default function (props: Props) {
  const { data, loading, error } = useQuery<{ employeeByEmail: EmployeePick }>(getEmployeeDetails, {
    variables: { email: props.employee.email },
  })
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  return <EmployeeView mobile={!isLarge} loading={loading} employee={employee} />
}
