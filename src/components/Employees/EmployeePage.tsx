import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeDetails from '../Employees/EmployeeDetails'
import EmployeeTabs from '../Employees/EmployeeTabs'

const query = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      isMe
    }
  }
`

function EmployeePage({ match }: RouteComponentProps<{ email: string; tab: string }>) {
  const { email, tab } = match.params

  const { data, loading, error } = useQuery<{ employees: Pick<Employee, 'id' | 'isMe'>[] }>(query, {
    variables: { input: { email } },
  })

  if (error) return <div>Error :(</div>

  if (!data) return null

  const employee = data?.employees?.[0]

  if (!employee) return <div>Employee is not found</div>

  return (
    <Skeleton loading={loading || !data} avatar>
      <EmployeeDetails employee={employee} />
      <EmployeeTabs employee={employee} tab={tab} />
    </Skeleton>
  )
}

export default withRouter(EmployeePage)
