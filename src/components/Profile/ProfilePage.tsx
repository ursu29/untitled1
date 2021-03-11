import React from 'react'
import { useGetProfileQuery } from '../../queries/profile'
import EmployeePage from '../Employees/EmployeePage'

function ProfilePage() {
  const { data, error } = useGetProfileQuery()

  if (error) return <div>Error :(</div>

  if (!data) return null

  return <EmployeePage rewriteEmail={data.profile?.email} hideNavigation />
}

export default ProfilePage
