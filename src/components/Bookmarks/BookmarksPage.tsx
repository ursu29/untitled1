import React from 'react'
import PageContent from '../UI/PageContent'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getBookmarks'
import Bookmarks from './Bookmarks'

export default function BookmarksPage() {
  const { data, loading } = useQuery<QueryType>(query)
  return (
    <PageContent>
      <Bookmarks loading={loading} bookmarks={data?.bookmarks} />
    </PageContent>
  )
}
