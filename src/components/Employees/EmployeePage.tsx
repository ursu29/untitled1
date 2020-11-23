import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee as EmployeeType } from '../../types'
import Skeleton from '../UI/Skeleton'
import Employee from './Employee'
import EmployeeTabs from '../Employees/EmployeeTabs'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import paths from '../../paths'
import PageContent from '../UI/PageContent'
import NotFound from '../UI/NotFound'
import fragments, { EmployeeDetails } from '../../fragments'

export const getEmployeeDetails = gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
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
  status: EmployeeType['status']
  bonuses: EmployeeType['bonuses']
  agileManager: EmployeeDetails | null
}

function EmployeePage({
  match,
  rewriteEmail,
  hideNavigation,
}: RouteComponentProps<{ email: string; tab: string }> & {
  rewriteEmail?: string
  hideNavigation?: boolean
}) {
  const { email, tab } = match.params

  const { data, loading, error } = useQuery<{ employeeByEmail: EmployeePick }>(getEmployeeDetails, {
    variables: { email: rewriteEmail ?? email },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  if (!loading && !employee) return <NotFound message="Employee is not found" />

  return (
    <Skeleton loading={loading || !data} avatar withOffset>
      {employee && (
        <>
          <PageContent noBottom>
            <Controls back={!hideNavigation && <Back goto={paths.EMPLOYEES} />} />
            <Employee employee={employee} />
          </PageContent>
          <EmployeeTabs employee={employee} tab={tab} />
        </>
      )}
    </Skeleton>
  )
}

export default withRouter(EmployeePage)
