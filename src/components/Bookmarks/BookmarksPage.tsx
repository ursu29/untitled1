import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import BookmarksList from './BookmarksList'
import CreateBookmark from './CreateBookmark'

function BookmarksPage({ match }: RouteComponentProps<{ id: string }>) {
    return (
        <PageContent>
          <CreateBookmark/>
          <BookmarksList/>
        </PageContent>
    )
}

export default withRouter(BookmarksPage)