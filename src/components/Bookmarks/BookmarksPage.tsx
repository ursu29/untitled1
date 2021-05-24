import { useQuery } from '@apollo/client'
import React from 'react'
import PageContent from '../UI/PageContent'
import query, { QueryType } from '../../queries/getBookmarks'
import Bookmarks from './Bookmarks'

export default function BookmarksPage() {
  const { data, loading } = useQuery<QueryType>(query)
  return (
    <PageContent style={{ padding: 0 }}>
      <Bookmarks loading={loading} bookmarks={data?.bookmarks} />
    </PageContent>
  )
}
