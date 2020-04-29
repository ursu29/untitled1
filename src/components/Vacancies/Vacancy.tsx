import React, { useEffect } from 'react'
import VacancyForm from './VacancyForm'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import updateVacancy from '../../queries/updateVacancy'
import publishVacancy from '../../queries/publishVacancy'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import { Typography } from 'antd'
import markdownToHtml from '../../utils/markdownToHtml'

function Vacancy({
  id,
  editable,
  refetchQueries,
}: {
  id: string
  editable: boolean
  refetchQueries?: any
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
    refetchQueries: [...(refetchQueries || []), { query: getVacancies }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  useEffect(() => {
    if (updateLoading || publishLoading) {
      message.loading('Saving')
    }
  }, [updateLoading, publishLoading])

  if (!id) return null

  const save = (callback?: any) => {
    return ({
      id,
      reason,
      locations,
      position,
      responsibilities,
      requiredSkills,
      additionalSkills,
      project,
    }: any) => {
      update({
        variables: {
          input: {
            id,
            reason,
            locations,
            position,
            responsibilities,
            requiredSkills,
            additionalSkills,
            project,
          },
        },
        update: callback,
      })
    }
  }
  const vacancy = data?.vacancies?.[0]

  const handleSave = save()
  const handlePublish = save(() => publish({ variables: { input: { id: vacancy?.id } } }))

  return (
    <Skeleton active loading={loading}>
      {!vacancy && <div>Vacancy is not found</div>}
      {vacancy && (
        <>
          {editable ? (
            <VacancyForm vacancy={vacancy} onSave={handleSave} onPublish={handlePublish} />
          ) : (
            <div>
              <p>
                <Typography.Title level={1}>{vacancy.position}</Typography.Title>
              </p>
              <p>
                <Typography.Title level={4}>Project</Typography.Title>
                <Typography.Text>{vacancy.project.name}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>Location</Typography.Title>
                <Typography.Text>{vacancy.locations.map((i) => i.name).join(', ')}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>What will you do</Typography.Title>
                <div
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy.responsibilities) }}
                />
              </p>
              <p>
                <Typography.Title level={4}>What is nice to have</Typography.Title>
                <div
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy.additionalSkills) }}
                />
              </p>
              <p>
                <Typography.Title level={4}>What is essential</Typography.Title>
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy.requiredSkills) }} />
              </p>
            </div>
          )}
        </>
      )}
    </Skeleton>
  )
}

export default Vacancy
