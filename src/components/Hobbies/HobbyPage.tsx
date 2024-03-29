import React from 'react'
import { useParams } from 'react-router-dom'
import { useEmployee } from '../../utils/withEmployee'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import { useGetHobbyQuery } from '../../queries/hobbies'
import { EditHobbyModal } from './EditHobbyModal'
import { HobbyInfo } from './HobbyInfo'
import { JoinHobby } from './JoinHobby'

export default function HobbyPage() {
  const { id } = useParams<{ id: string }>()
  const { employee } = useEmployee()
  const { data, loading, error } = useGetHobbyQuery({
    variables: { id },
  })

  const hobby = data?.hobby

  return (
    <>
      <PageHeader
        title={hobby?.name}
        withBack
        extra={
          hobby
            ? [
                <EditHobbyModal hobby={hobby} />,
                <JoinHobby hobby={hobby} employeeId={employee.id} />,
              ]
            : null
        }
      />
      <PageContent
        error={error}
        loading={loading}
        notFound={!hobby}
        notFoundMessage="Sorry, hobby was not found"
      >
        {hobby && <HobbyInfo hobby={hobby} />}
      </PageContent>
    </>
  )
}
