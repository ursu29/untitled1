import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getPosts, { QueryType } from '../../queries/getPosts'
import Posts from './Posts'

interface Props {
  editable?: boolean
}

function NewsFeed({ editable }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getPosts)

  if (error) return <div>Error :(</div>

  const posts = data?.posts || []

  return <Posts loading={loading} editable={editable} posts={posts} />
}

export default NewsFeed
