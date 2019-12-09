import React from 'react'
import query, { QueryType } from '../../queries/getMatrices'
import { useQuery } from '@apollo/react-hooks'
import EmployeeList from '../UI/EmployeesList'

export default function EmployeesPage() {
  const { data, loading, error } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  console.log(data)
  return <div>Matrices List</div>
}
