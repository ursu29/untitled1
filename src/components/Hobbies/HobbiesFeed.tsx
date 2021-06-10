import React from 'react'
import { Row, Col, Timeline, Skeleton } from 'antd'
import { NEWS_FEED_WIDTH } from '../../config'
import { useGetHobbyPostsQuery, GetHobbyPostsDocument } from '../../queries/hobbyPosts'
import HobbyPost from './HobbyPost'
import { UpdateHobbyPostModal } from './UpdateHobbyModal'
import { CreateHobbyPostModal } from './CreateHobbyPostModal'

const first = 5

const HobbiesFeed = () => {
  // TODO: loading
  const { data, fetchMore, error, loading } = useGetHobbyPostsQuery({
    variables: {
      input: {
        first,
      },
    },
  })

  if (error) return <div>Error :(</div>

  const hobbyPosts = data?.hobbyPosts || []

  return (
    <Skeleton active loading={loading}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 0 16px' }}>
        <CreateHobbyPostModal
          key="CreateHobbyPost"
          refetchQueries={[{ query: GetHobbyPostsDocument, variables: { input: { first } } }]}
        />
      </div>
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
    </Skeleton>
  )
}

export default HobbiesFeed
