import React, { useEffect } from 'react'
import VacancyForm from './VacancyForm'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import updateVacancy from '../../queries/updateVacancy'
import publishVacancy from '../../queries/publishVacancy'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import { Typography } from 'antd'

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

  const handleSave = ({
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
    })
  }

  const vacancy = data?.vacancies?.[0]
  return (
    <Skeleton active loading={loading}>
      {!vacancy && <div>Vacancy is not found</div>}
      {vacancy && (
        <>
          {editable ? (
            <VacancyForm
              vacancy={vacancy}
              onSave={handleSave}
              onPublish={values => {
                publish({
                  variables: { input: { id: values.id } },
                })
              }}
            />
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
                <Typography.Text>{vacancy.locations.map(i => i.name).join(', ')}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>What will you do</Typography.Title>
                <Typography.Text>{vacancy.responsibilities}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>What is nice to have</Typography.Title>
                <Typography.Text>{vacancy.additionalSkills}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>What is essential</Typography.Title>
                <Typography.Text>{vacancy.requiredSkills}</Typography.Text>
              </p>
            </div>
          )}
        </>
      )}
    </Skeleton>
  )
}

export default Vacancy
