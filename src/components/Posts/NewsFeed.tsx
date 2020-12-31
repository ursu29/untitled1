import { useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import getPosts, { QueryType } from '../../queries/getPosts'
import { Employee } from '../../types'
import Posts from './Posts'
import { PageHeader, Row, Col, Typography } from 'antd'
import CreatePost from './CreatePost'
import PostsFilter from './PostsFilter'
import { NetworkStatus } from 'apollo-client'

interface Props {
  editable?: boolean
  employee: Pick<Employee, 'id' | 'location'>
}

function NewsFeed({ editable, employee }: Props) {
  const [hasMore, setHasMore] = useState(true)
  const [filter, setFilter] = useState({
    isTranslated: employee.location === 'Zurich' ? true : false,
    tags: null,
    text: null,
  })

  let { data, fetchMore, loading, error, networkStatus } = useQuery<QueryType>(getPosts, {
    variables: { first: 4, filter },
    notifyOnNetworkStatusChange: true,
  })

  if (networkStatus === NetworkStatus.setVariables) {
    data = undefined
    loading = true
  }

  if (error) return <div>Error :(</div>

  return (
    <>
      <PageHeader
        title={
          <Typography.Title level={2} style={{ marginBottom: 11 }}>
            News
          </Typography.Title>
        }
        subTitle="Latest Syncretis posts"
        extra={[editable ? <CreatePost key="1" filter={filter} /> : null]}
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      />
      <Row gutter={24}>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 17, order: 1 }}>
          <Posts
            loading={loading}
            editable={editable}
            posts={data?.posts}
            hasMore={hasMore}
            loadMore={(post: any) => {
              const lastPost = data?.posts[data?.posts.length - 1]
              if (lastPost && lastPost?.id === post?.id) {
                fetchMore({
                  variables: { after: lastPost.id },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    if (!fetchMoreResult.posts.length) {
                      setHasMore(false)
                      return prev
                    }
                    if (!prev) return fetchMoreResult
                    const prevPostsIds = prev.posts.map(i => i.id)
                    return Object.assign({}, prev, {
                      posts: [
                        ...prev.posts,
                        ...fetchMoreResult.posts.filter(i => !prevPostsIds.includes(i.id)),
                      ],
                    })
                  },
                })
              }
            }}
          />
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 7, order: 2 }}>
          <PostsFilter
            filter={filter}
            setFilter={(newFilter: any) => {
              setHasMore(true)
              setFilter(newFilter)
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default NewsFeed
