import { useQuery } from "@apollo/client";
import React from 'react'
import query, { QueryType } from '../../queries/getEmployees'
import EmployeesList from './EmployeesList'
import Skeleton from '../UI/Skeleton'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return (
    <Skeleton withOffset active loading={loading}>
      <EmployeesList fixed loading={loading} employees={data?.employees} />
    </Skeleton>
  )
}
