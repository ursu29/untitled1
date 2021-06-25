import React from 'react'
import { Col, Row, Skeleton } from 'antd'
import { useGetHobbiesQuery, GetHobbiesDocument } from '../../queries/hobbies'
import { HobbyCard } from './HobbyCard'
import { CreateHobbyModal } from './CreateHobbyModal'

function HobbiesPage() {
  const { data, loading, error } = useGetHobbiesQuery()

  if (error) return <div>Error :(</div>

  const hobbies = data?.hobbies

  return (
    <Skeleton active loading={loading}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 0 16px' }}>
        <CreateHobbyModal key="CreateHobby" refetchQueries={[{ query: GetHobbiesDocument }]} />
      </div>
      <Row gutter={[16, 16]}>
        {hobbies?.map(hobby => (
          <Col key={hobby.id} xs={24} md={12}>
            <HobbyCard hobby={hobby} />
          </Col>
        ))}
      </Row>
    </Skeleton>
  )
}

export default HobbiesPage
