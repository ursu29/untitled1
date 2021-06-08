import React from 'react'
import { Row, Col } from 'antd'
import { useGetHobbyPostsQuery } from '../../queries/hobbyPosts'
import HobbyPost from './HobbyPost'

const HobbiesFeed = () => {
  // TODO: loading
  const { data, error } = useGetHobbyPostsQuery()

  if (error) return <div>Error :(</div>

  const hobbyPosts = data?.hobbyPosts || []

  return (
    <Row gutter={24}>
      <Col xs={{ span: 24, order: 2 }} md={{ span: 17, order: 1 }}>
        {hobbyPosts.map(post => (
          <HobbyPost key={post.id} post={post} />
        ))}
      </Col>
      <Col xs={{ span: 24, order: 1 }} md={{ span: 7, order: 2 }}>
        TODO: filters
      </Col>
    </Row>
  )
}

export default HobbiesFeed
