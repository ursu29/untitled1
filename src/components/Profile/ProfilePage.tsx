import React from 'react'
import gql from 'graphql-tag'
import EmployeeDetails from '../Employees/EmployeeDetails'
import EmployeeTabs from '../Employees/EmployeeTabs'
import { useQuery } from '@apollo/react-hooks'
import { Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import PostList from '../UI/Timeline'

const query = gql`
  {
    profile {
      id
    }
  }
`

function ProfilePage({ match }: RouteComponentProps<{ tab: string }>) {
  const { data, loading, error } = useQuery<{ profile: Pick<Employee, 'id'> }>(query)

  if (error) return <div>Error :(</div>

  if (!data) return null

  if (!data?.profile) return <div>Employee is not found</div>

  return (
    <Skeleton loading={loading || !data} avatar>
      <EmployeeDetails employee={data.profile} />
      <EmployeeTabs employee={data.profile} tab={match.params.tab} />
    </Skeleton>
  )
}

export default withRouter(ProfilePage)
