import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import VacanciesList from './VacanciesList'
import Skeleton from '../UI/Skeleton'
import PageContent from '../UI/PageContent'
import { Typography } from 'antd'

function VacanciesPage() {
  const { data, loading } = useQuery<QueryType>(getVacancies)
  return (
    <Skeleton active loading={loading} padding={20}>
      <PageContent noBottom>
        <Typography.Title>Open vacancies</Typography.Title>
      </PageContent>
      <VacanciesList items={data?.vacancies || []} />
    </Skeleton>
  )
}

export default VacanciesPage
