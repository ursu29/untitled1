import React from 'react'
import query, { QueryType } from '../../queries/getProjects'
import { useQuery } from '@apollo/react-hooks'
import ProjectsList from '../Projects/ProjectsList'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return <ProjectsList loading={loading} projects={data?.projects} />
}
