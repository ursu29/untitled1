import React from 'react'
import { QueryType } from '../../queries/getBookmarks'
import UpdateBookmark from './UpdateBookmark'
import DeleteBookmark from './DeleteBookmark'
import LikeBookmark from './LikeBookmark'
import BookmarksList from '../UI/BookmarksList'

interface Props {
  loading: boolean
  bookmarks?: QueryType['bookmarks']
}

export default function Bookmarks({ bookmarks, loading }: Props) {
  return (
    <BookmarksList
      loading={loading}
      bookmarks={bookmarks}
      UpdateBookmark={UpdateBookmark}
      DeleteBookmark={DeleteBookmark}
      LikeBookmark={LikeBookmark}
    />
  )
}
