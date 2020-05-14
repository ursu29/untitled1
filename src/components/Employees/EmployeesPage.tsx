import React from 'react'
import query, { QueryType } from '../../queries/getEmployees'
import { useQuery } from '@apollo/react-hooks'
import EmployeesList from './EmployeesList'
import EmployeeAvatar from './EmployeeAvatar'
import Skeleton from '../UI/Skeleton'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return (
    <Skeleton withOffset active loading={loading}>
      <EmployeesList fixed loading={loading} employees={data?.employees} Avatar={EmployeeAvatar} />
    </Skeleton>
  )
}
