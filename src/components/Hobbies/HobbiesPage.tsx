import React from 'react'
import { Col, Row } from 'antd'
import { useGetHobbiesQuery, GetHobbiesDocument } from '../../queries/hobbies'
import PageHeader from '../UI/PageHeader'
import PageContent from '../UI/PageContent'
import { CreateHobbyModal } from './CreateHobbyModal'
import { HobbyCard } from './HobbyCard'

export default function HobbiesPage() {
  const { data, loading, error } = useGetHobbiesQuery()

  const hobbies = data?.hobbies

  return (
    <>
      <PageHeader
        title="Hobbies"
        extra={[<CreateHobbyModal refetchQueries={[{ query: GetHobbiesDocument }]} />]}
      />
      <PageContent
        error={error}
        loading={loading}
        notFound={!hobbies}
        notFoundMessage="Sorry, hobbies were not found"
      >
        <Row gutter={[16, 16]}>
          {hobbies?.map(hobby => (
            <Col key={hobby.id} xs={24} md={12} lg={8}>
              <HobbyCard hobby={hobby} />
            </Col>
          ))}
        </Row>
      </PageContent>
    </>
  )
}
