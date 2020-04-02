import React, { useEffect } from 'react'
import VacancyForm from './VacancyForm'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import updateVacancy from '../../queries/updateVacancy'
import publishVacancy from '../../queries/publishVacancy'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import message from '../../message'

function Vacancy({
  id,
  editable,
  refetchQueries,
}: {
  id: string
  editable: boolean
  refetchQueries: any
}) {
  const { data, loading } = useQuery<QueryType>(getVacancies, {
    variables: { input: { id } },
    onError: message.error,
    skip: !id,
  })

  const [update, { loading: updateLoading }] = useMutation(updateVacancy, {
    onCompleted: () => message.success('Vacancy is saved'),
    refetchQueries,
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const [publish, { loading: publishLoading }] = useMutation(publishVacancy, {
    onCompleted: () => message.success('Vacancy is published'),
    refetchQueries,
    awaitRefetchQueries: true,
    onError: message.error,
  })

  useEffect(() => {
    if (updateLoading || publishLoading) {
      message.loading('Saving')
    }
  }, [updateLoading, publishLoading])

  if (!id) return null

  const vacancy = data?.vacancies?.[0]
  return (
    <Skeleton active loading={loading}>
      {!vacancy && <div>Vacancy is not found</div>}
      {vacancy && editable && (
        <VacancyForm
          vacancy={vacancy}
          onSave={({ isPublished, __typename, ...values }) => {
            update({
              variables: { input: values },
            })
          }}
          onPublish={values => {
            publish({
              variables: { input: { id: values.id } },
            })
          }}
        />
      )}
    </Skeleton>
  )
}

export default Vacancy
