import React from 'react'
import { Row, Col, Timeline } from 'antd'
import { NEWS_FEED_WIDTH } from '../../config'
import { useGetHobbyPostsQuery } from '../../queries/hobbyPosts'
import HobbyPost from './HobbyPost'
import { UpdateHobbyPostModal } from './UpdateHobbyModal'

type Props = {
  first: number
}

const HobbiesFeed = ({ first }: Props) => {
  // TODO: loading
  const { data, fetchMore, error } = useGetHobbyPostsQuery({
    variables: {
      input: {
        first,
      },
    },
  })

  if (error) return <div>Error :(</div>

  const hobbyPosts = data?.hobbyPosts || []

  return (
    <Row gutter={24}>
      <Col xs={{ span: 24, order: 2 }} md={{ span: 17, order: 1 }}>
        <Timeline style={{ maxWidth: NEWS_FEED_WIDTH }}>
          {hobbyPosts.map((post, index) => (
            <Timeline.Item key={post.id}>
              <HobbyPost
                post={post}
                edit={<UpdateHobbyPostModal post={post} />}
                checkVisibility={index === hobbyPosts.length - 1}
                loadMore={() => {
                  const postId = post.id
                  const lastPost = hobbyPosts[hobbyPosts.length - 1]
                  if (lastPost?.id === postId && fetchMore) {
                    fetchMore({
                      variables: {
                        input: { first, after: postId },
                      },
                    })
                  }
                }}
              />
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>
      <Col xs={{ span: 24, order: 1 }} md={{ span: 7, order: 2 }}>
        TODO: filters
      </Col>
    </Row>
  )
}

export default HobbiesFeed
