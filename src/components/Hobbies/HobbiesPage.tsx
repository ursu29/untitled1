import React from 'react'
import { Col, Row } from 'antd'
import { useGetHobbiesQuery, GetHobbiesDocument } from '../../queries/hobbies'
import { GetHobbyPostsDocument } from '../../queries/hobbyPosts'
import PageHeader from '../UI/PageHeader'
import PageContent from '../UI/PageContent'
import { CreateHobbyModal } from './CreateHobbyModal'
import { CreateHobbyPostModal } from './CreateHobbyPostModal'
import { HobbyCard } from './HobbyCard'
import HobbiesFeed from './HobbiesFeed'

const first = 5

function HobbiesPage() {
  const { data, loading, error } = useGetHobbiesQuery()

  const hobbies = data?.hobbies

  return (
    <>
      <PageHeader
        title="Hobbies"
        extra={[
          <CreateHobbyModal key="CreateHobby" refetchQueries={[{ query: GetHobbiesDocument }]} />,
          <CreateHobbyPostModal
            key="CreateHobbyPost"
            refetchQueries={[{ query: GetHobbyPostsDocument, variables: { input: { first } } }]}
          />,
        ]}
      />
      <PageContent
        error={error}
        loading={loading}
        notFound={!hobbies}
        notFoundMessage="Sorry, hobbies were not found"
      >
        <HobbiesFeed first={first} />
        <Row gutter={[16, 16]}>
          {hobbies?.map(hobby => (
            <Col key={hobby.id} xs={24} md={12}>
              <HobbyCard hobby={hobby} />
            </Col>
          ))}
        </Row>
      </PageContent>
    </>
  )
}

export default HobbiesPage
