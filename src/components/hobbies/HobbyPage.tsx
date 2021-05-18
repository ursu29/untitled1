import React from 'react'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import { useGetHobbiesQuery } from '../../queries/hobbies'
import { useParams } from 'react-router-dom'

export default function HobbyPage() {
  // TODO: get by id
  const { id } = useParams()
  const { data, loading, error } = useGetHobbiesQuery()

  const hobbies = data?.hobbies

  return (
    <>
      <PageHeader title="Hobbies" />
      <PageContent
        error={error}
        loading={loading}
        notFound={!hobbies}
        notFoundMessage="Sorry, guilds were not found"
      >
        {id}
        {hobbies?.map(hobby => (
          <div key={hobby.id}>{hobby.name}</div>
        ))}
      </PageContent>
    </>
  )
}
