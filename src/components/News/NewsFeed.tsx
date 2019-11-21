import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Post from '../UI/Post'
import PostItem from '../UI/Post'
import { Post as PostType, Employee } from '../../types'
import Timeline from '../UI/Timeline'

const query = gql`
  {
    posts {
      id
      title
      body
      bodyTranslated
      createdAt
      updatedAt
      createdBy {
        id
        name
        email
      }
    }
  }
`

type PostPick = Pick<
  PostType,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
}

export default function NewsFeed() {
  const { data, loading, error } = useQuery<{ posts: PostPick[] }>(query)

  if (error) return <div>Error :(</div>

  return (
    <Timeline
      loading={loading}
      items={data?.posts.map(i => ({
        render: <Post post={i} />,
      }))}
    />
  )
}
