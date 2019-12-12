import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import BookmarksList from './BookmarksList'
import CreateBookmark from './CreateBookmark'

export default function BookmarksPage() {
  return (
    <PageContent>
      <CreateBookmark/>
      <BookmarksList/>
    </PageContent>
  )
}