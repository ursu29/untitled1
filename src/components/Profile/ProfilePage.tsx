import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Employee } from '../../types'
import EmployeePage from '../Employees/EmployeePage'

const query = gql`
  {
    profile {
      id
      email
    }
  }
`

function ProfilePage() {
  const { data, error } = useQuery<{ profile: Pick<Employee, 'id' | 'email'> }>(query)

  if (error) return <div>Error :(</div>

  if (!data) return null

  return <EmployeePage rewriteEmail={data.profile.email} hideNavigation />
}

export default ProfilePage
