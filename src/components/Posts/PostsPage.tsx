import React from 'react'
import NewsFeed from './NewsFeed'
import PageContent from '../UI/PageContent'
import gql from 'graphql-tag'
import { Access, Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'

const query = gql`
  {
    profile {
      id
      location
    }
    postsEditor {
      read
      write
    }
  }
`

type QueryType = { postsEditor: Access; profile: Pick<Employee, 'id' | 'location'> }

export default function PostsPage() {
  const { data } = useQuery<QueryType>(query)
  const editable = data?.postsEditor.write

  const employee = data?.profile
  if (!employee) return null

  return (
    <PageContent>
      <NewsFeed employee={employee} editable={editable} />
    </PageContent>
  )
}
