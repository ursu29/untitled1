import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getPosts, { QueryType } from '../../queries/getPosts'
import Post from '../UI/Post'
import Timeline from '../UI/Timeline'
import EditPost from './EditPost'

interface Props {
  editable?: boolean
}

export default function NewsFeed({ editable }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getPosts)

  if (error) return <div>Error :(</div>

  return (
    <Timeline
      loading={loading}
      items={data?.posts.map(i => ({
        id: i.id,
        render: <Post edit={editable ? <EditPost post={i} /> : null} post={i} />,
      }))}
    />
  )
}
