import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getPosts, { QueryType } from '../../queries/getPosts'
import Post from '../UI/Post'
import Timeline from '../UI/Timeline'

export default function NewsFeed() {
  const { data, loading, error } = useQuery<{ posts: QueryType[] }>(getPosts)

  if (error) return <div>Error :(</div>

  return (
    <Timeline
      loading={loading}
      items={data?.posts.map(i => ({
        id: i.id,
        render: <Post post={i} />,
      }))}
    />
  )
}
