import React from 'react'
import query, { QueryType } from '../../queries/getEmployees'
import { useQuery } from '@apollo/react-hooks'
import EmployeeList from '../UI/EmployeesList'
import EmployeeAvatar from './EmployeeAvatar'

export default function EmployeesPage() {
  const { data, loading, error } = useQuery<QueryType>(query)
  return <EmployeeList loading={loading} employees={data?.employees} Avatar={EmployeeAvatar} />
}
