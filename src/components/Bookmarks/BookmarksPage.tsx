import React from 'react'
import PageContent from '../UI/PageContent'
import BookmarksList from '../UI/BookmarksList'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getBookmarks'
import CreateBookmark from './CreateBookmark'
import UpdateBookmark from './UpdateBookmark'
import DeleteBookmark from './DeleteBookmark'
import LikeBookmark from './LikeBookmark'

export default function BookmarksPage() {
  const { data, loading } = useQuery<QueryType>(query);
  return (
    <PageContent>
      <CreateBookmark/>
      <BookmarksList loading={loading} bookmarks={data?.bookmarks}
                     UpdateBookmark={UpdateBookmark} DeleteBookmark={DeleteBookmark} LikeBookmark={LikeBookmark} />
    </PageContent>
  )
}