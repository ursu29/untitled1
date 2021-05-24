import { useQuery } from '@apollo/client'
import React from 'react'
import query, { QueryType } from '../../queries/getProjects'
import ProjectsList from '../Projects/ProjectsList'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return <ProjectsList loading={loading} projects={data?.projects} />
}
