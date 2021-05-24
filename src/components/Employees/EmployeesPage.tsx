import { useQuery } from '@apollo/client'
import React from 'react'
import query, { QueryType } from '../../queries/getEmployees'
import EmployeesList from './EmployeesList'
import Skeleton from '../UI/Skeleton'
import Helmet from '../Helmet'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return (
    <Skeleton withOffset active loading={loading}>
      <Helmet title="Employees" />
      <EmployeesList fixed loading={loading} employees={data?.employees} />
    </Skeleton>
  )
}
