import React from 'react'
import { QueryType } from '../../queries/getBookmarks'
import UpdateBookmark from './UpdateBookmark'
import DeleteBookmark from './DeleteBookmark'
import LikeBookmark from './LikeBookmark'
import BookmarksList from './BookmarksList'
import CreateBookmark from './CreateBookmark'
import { PureQueryOptions } from '@apollo/client'

interface Props {
  loading: boolean
  bookmarks?: QueryType['bookmarks']
  refetchQueries?: PureQueryOptions[]
  isAddButtonHidden?: boolean
}

export default function Bookmarks({
  bookmarks,
  loading,
  refetchQueries,
  isAddButtonHidden,
}: Props) {
  return (
    <BookmarksList
      loading={loading}
      bookmarks={bookmarks}
      createBookmark={!isAddButtonHidden && <CreateBookmark refetchQueries={refetchQueries} />}
      UpdateBookmark={UpdateBookmark}
      DeleteBookmark={DeleteBookmark}
      LikeBookmark={LikeBookmark}
      refetchQueries={refetchQueries}
    />
  )
}
