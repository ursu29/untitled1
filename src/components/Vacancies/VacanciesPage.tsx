import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import VacanciesList from './VacanciesList'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'

function VacanciesPage() {
  const { data, loading } = useQuery<QueryType>(getVacancies)
  return (
    <>
      <PageHeader title="Open vacancies" />
      <PageContent loading={loading}>
        <VacanciesList items={data?.vacancies} />
      </PageContent>
    </>
  )
}

export default VacanciesPage
