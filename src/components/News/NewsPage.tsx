import React from 'react'
import NewsFeed from './NewsFeed'
import CreatePost from './CreatePost'

export default function NewsPage() {
  return (
    <div>
      <CreatePost />
      <NewsFeed />
    </div>
  )
}
