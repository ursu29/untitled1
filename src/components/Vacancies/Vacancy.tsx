import React from 'react'
import VacancyForm from './VacancyForm'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'

function Vacancy({ id }: { id: string }) {
  const { data, loading } = useQuery<QueryType>(getVacancies, {
    variables: { input: { id } },
    skip: !id,
  })

  if (!id) return null

  const vacancy = data?.vacancies?.[0]
  return (
    <Skeleton active loading={loading}>
      {!vacancy && <div>Vacancy is not found</div>}
      {vacancy && <VacancyForm vacancy={vacancy} />}
    </Skeleton>
  )
}

export default Vacancy
