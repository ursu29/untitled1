import React from 'react'
import { useGetProfileQuery } from '../../queries/profile'
import EmployeePage from '../Employees/EmployeePage'
import Helmet from '../Helmet'

function ProfilePage() {
  const { data, error } = useGetProfileQuery()

  if (error) return <div>Error :(</div>

  if (!data) return null

  return (
    <>
      <Helmet title={data.profile?.name} />
      <EmployeePage rewriteEmail={data.profile?.email} hideNavigation />
    </>
  )
}

export default ProfilePage
