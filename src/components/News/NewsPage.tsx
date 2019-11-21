import React from 'react'
import NewsFeed from './NewsFeed'
import CreatePost from './CreatePost'
import PageContent from '../UI/PageContent'

export default function NewsPage() {
  return (
    <PageContent>
      <CreatePost />
      <NewsFeed />
    </PageContent>
  )
}
