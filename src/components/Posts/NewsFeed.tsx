import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getPosts, { QueryType } from '../../queries/getPosts'
import TagSelect from '../Tags/TagSelect'
import Posts from '../UI/Posts'
import CreatePost from './CreatePost'
import UpdatePost from './UpdatePost'

interface Props {
  editable?: boolean
}

function NewsFeed({ editable }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getPosts)

  if (error) return <div>Error :(</div>

  const posts = data?.posts || []

  return (
    <Posts
      loading={loading}
      editable={editable}
      CreatePost={CreatePost}
      posts={posts}
      UpdatePost={UpdatePost}
      TagSelect={TagSelect}
    />
  )
}

export default NewsFeed
