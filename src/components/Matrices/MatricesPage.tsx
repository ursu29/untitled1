import { useQuery } from '@apollo/client'
import React from 'react'
import query, { QueryType } from '../../queries/getMatrices'
import MatricesList from './MatricesList'
import CreateMatrix from './CreateMatrix'
import PageContent from '../UI/PageContent'
import NotAllowed from '../UI/NotAllowed'
import Helmet from '../Helmet'

export default function EmployeesPage() {
  const { data, loading } = useQuery<QueryType>(query, { fetchPolicy: 'cache-first' })

  if (!loading && !data?.matricesAccess.read) return <NotAllowed />

  return (
    <PageContent>
      <Helmet title="Matrices" />
      <CreateMatrix />
      <MatricesList loading={loading} matrices={data?.matrices} />
    </PageContent>
  )
}
