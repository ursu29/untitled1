import { useQuery, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import VacancyForm from './VacancyForm'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import updateVacancy from '../../queries/updateVacancy'
import closeVacancy from '../../queries/closeVacancy'
import publishVacancy from '../../queries/publishVacancy'
import Skeleton from '../UI/Skeleton'
import message from '../../message'
import { Typography, Tag } from 'antd'
import markdownToHtml from '../../utils/markdownToHtml'
import getLocationName from '../../utils/getLocationName'
import Helmet from '../Helmet'

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

  const [close, { loading: closeLoading }] = useMutation(closeVacancy, {
    onCompleted: () => message.success('Vacancy is closed'),
    refetchQueries,
    awaitRefetchQueries: true,
    onError: message.error,
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
    if (closeLoading || updateLoading || publishLoading) {
      message.loading('Saving')
    }
  }, [closeLoading, updateLoading, publishLoading])

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
      employeeExperience,
      englishLevel,
      stack,
      description,
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
            employeeExperience,
            englishLevel,
            stack,
            description,
          },
        },
        update: callback,
      })
    }
  }
  const vacancy = data?.vacancies?.[0]

  const handleClose = () =>
    close({
      variables: {
        input: {
          id: vacancy?.id,
        },
      },
    })
  const handleSave = save()
  const handlePublish = save(() => publish({ variables: { input: { id: vacancy?.id } } }))
  return (
    <Skeleton active loading={loading}>
      <Helmet title={vacancy?.position} />
      {!vacancy && <div>Vacancy is not found</div>}
      {vacancy && (
        <>
          {editable ? (
            <VacancyForm
              vacancy={vacancy}
              onClose={handleClose}
              onSave={handleSave}
              onPublish={handlePublish}
            />
          ) : (
            <div data-cy="vacancy">
              {vacancy.isClosed && (
                <div style={{ margin: '-4px 0 10px 0' }}>
                  <Tag color="red">Vacancy is closed</Tag>
                </div>
              )}
              <p>
                <Typography.Title level={1}>{vacancy?.position}</Typography.Title>
              </p>
              <p>
                <Typography.Title level={4}>Project</Typography.Title>
                <Typography.Text>{vacancy?.project?.name}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>Location</Typography.Title>
                <Typography.Text>
                  {vacancy?.locations?.map(i => getLocationName(i)).join(', ')}
                </Typography.Text>
              </p>
              {vacancy.englishLevel && (
                <p>
                  <Typography.Title level={4}>English Level</Typography.Title>
                  <Typography.Text>{vacancy?.englishLevel}</Typography.Text>
                </p>
              )}
              {vacancy.employeeExperience && (
                <p>
                  <Typography.Title level={4}>Employee experience</Typography.Title>
                  <Typography.Text>{vacancy?.employeeExperience}</Typography.Text>
                </p>
              )}
              <p>
                <Typography.Title level={4}>Project</Typography.Title>
                <Typography.Text>{vacancy?.project?.name}</Typography.Text>
              </p>
              <p>
                <Typography.Title level={4}>What will you do</Typography.Title>
                <div
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy?.responsibilities) }}
                />
              </p>
              <p>
                <Typography.Title level={4}>What is essential</Typography.Title>
                <div
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy?.requiredSkills) }}
                />
              </p>
              {vacancy?.additionalSkills && (
                <p>
                  <Typography.Title level={4}>What is nice to have</Typography.Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy?.additionalSkills) }}
                  />
                </p>
              )}
              {vacancy?.stack && (
                <p>
                  <Typography.Title level={4}>Project stack</Typography.Title>
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(vacancy?.stack) }} />
                </p>
              )}
            </div>
          )}
        </>
      )}
    </Skeleton>
  )
}

export default Vacancy
