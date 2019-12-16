import React from 'react'
import NewsFeed from './NewsFeed'
import CreatePost from './CreatePost'
import PageContent from '../UI/PageContent'
import gql from 'graphql-tag'
import { Access } from '../../types'
import { useQuery } from '@apollo/react-hooks'

const query = gql`
  {
    postsEditor {
      read
      write
    }
  }
`

type QueryType = { postsEditor: Access }

export default function PostsPage() {
  const { data } = useQuery<QueryType>(query)
  const editable = data?.postsEditor.write
  return (
    <PageContent>
      {editable && <CreatePost />}
      <NewsFeed editable={editable} />
    </PageContent>
  )
}
