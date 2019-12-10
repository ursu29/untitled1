import React from 'react'
import query, { QueryType } from '../../queries/getProjects'
import { useQuery } from '@apollo/react-hooks'
import ProjectsList from '../UI/ProjectsList'

export default function EmployeesPage() {
  const { data, loading, error } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return <ProjectsList loading={loading} projects={data?.projects} />
}
