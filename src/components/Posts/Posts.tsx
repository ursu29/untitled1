import { Timeline, Skeleton } from 'antd'
import React, { PropsWithChildren } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { NEWS_FEED_WIDTH } from '../../config'
import { Employee, Post, Tag } from '../../types'
import PostItem from './Post'
import UpdatePost from './UpdatePost'

export type PostPick = Pick<
  Post,
  | 'id'
  | 'title'
  | 'body'
  | 'isTranslated'
  | 'createdAt'
  | 'publishDate'
  | 'locations'
  | 'images'
  | 'annotation'
  | 'titleImage'
  | 'backgroundImage'
  | 'foregroundImage'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

interface Props extends PropsWithChildren<any>, RouteComponentProps {
  loading?: boolean
  posts?: PostPick[]
  editable: boolean
  loadMore: (post: PostPick) => void
  hasMore: boolean
}

function Posts({ posts, history, location, loading, loadMore, hasMore, ...props }: Props) {
  if (!posts && loading) {
    return <Skeleton title paragraph={{ rows: 7 }} />
  }

  if (!posts?.length && !loading) return <div>No posts yet</div>

  return (
    <Timeline pending={loading ? 'Loading...' : undefined} style={{ maxWidth: NEWS_FEED_WIDTH }}>
      {posts?.map(post => (
        <Timeline.Item key={post.id}>
          <PostItem
            edit={props.editable ? <UpdatePost post={post} /> : null}
            post={post}
            loadMore={loadMore}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default withRouter(Posts)
