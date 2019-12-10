import React from 'react'
import query, { QueryType } from '../../queries/getMatrices'
import { useQuery } from '@apollo/react-hooks'
import MatricesList from '../UI/MatricesList'
import CreateMatrix from './CreateMatrix'
import PageContent from '../UI/PageContent'

export default function EmployeesPage() {
  const { data, loading, error } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })
  return (
    <PageContent>
      <CreateMatrix />
      <MatricesList loading={loading} matrices={data?.matrices} />
    </PageContent>
  )
}
