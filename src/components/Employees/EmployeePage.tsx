import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeDetails from '../Employees/EmployeeDetails'
import EmployeeTabs from '../Employees/EmployeeTabs'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import paths from '../../paths'
import PageContent from '../UI/PageContent'
import NotFound from '../UI/NotFound'

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

  if (!employee) return <NotFound message="Employee is not found" />

  return (
    <Skeleton loading={loading || !data} avatar>
      <PageContent noBottom>
        <Controls back={<Back goto={paths.EMPLOYEES} />} />
        <EmployeeDetails employee={employee} />
      </PageContent>
      <EmployeeTabs employee={employee} tab={tab} />
    </Skeleton>
  )
}

export default withRouter(EmployeePage)
