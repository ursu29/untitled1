import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useGetEmployeeDetailedQuery } from '../../queries/employees'
import EmployeeTabs from '../Employees/EmployeeTabs'
import Helmet from '../Helmet'
import NotFound from '../UI/NotFound'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import Skeleton from '../UI/Skeleton'
import Employee from './Employee'

function EmployeePage({
  match,
  rewriteEmail,
  hideNavigation,
}: RouteComponentProps<{ email: string; tab: string }> & {
  rewriteEmail?: string
  hideNavigation?: boolean
}) {
  const { email, tab } = match.params

  const { data, loading, error } = useGetEmployeeDetailedQuery({
    variables: { email: rewriteEmail ?? email },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employeeByEmail

  if (!loading && !employee) return <NotFound message="Employee is not found" />

  return (
    <Skeleton loading={loading || !data} avatar withOffset>
      {employee && (
        <>
          {!hideNavigation && <PageHeader withBack title={`${employee.name}'s profile`} />}
          <Helmet title={employee.name} />
          <PageContent noBottom>
            <Employee employee={employee} />
          </PageContent>
          <EmployeeTabs key={employee.id} employee={employee} tab={tab} />
        </>
      )}
    </Skeleton>
  )
}

export default withRouter(EmployeePage)
