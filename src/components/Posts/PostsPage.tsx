import React, { useState } from 'react'
import NewsFeed from './NewsFeed'
import PageContent from '../UI/PageContent'
import gql from 'graphql-tag'
import { Access, Employee, LOCATION } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import PageHeader from '../UI/PageHeader'
import CreatePost from './CreatePost'

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

  const [filter, setFilter] = useState({
    isTranslated: employee?.location === LOCATION.ZURICH ? true : false,
    tags: null,
    text: null,
  })

  if (!employee) return null

  return (
    <>
      <PageHeader
        title="News"
        subTitle="Latest Syncretis posts"
        extra={[editable ? <CreatePost key="1" filter={filter} /> : null]}
      />
      <PageContent>
        <NewsFeed employee={employee} editable={editable} filter={filter} setFilter={setFilter} />
      </PageContent>
    </>
  )
}
