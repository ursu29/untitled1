import React from 'react'
import { Timeline } from 'antd'
import { NEWS_FEED_WIDTH } from '../../config'
import { HobbyPostBaseFragment } from '../../queries/hobbyPosts'
import HobbyPost from './HobbyPost'
import { UpdateHobbyPostModal } from './UpdateHobbyModal'

type Props = {
  posts?: HobbyPostBaseFragment[]
  loadMore: (postId: string) => void
}

const HobbiesFeedPosts = ({ posts, loadMore }: Props) => {
  if (!posts?.length) return <div>No posts yet</div>

  return (
    <Timeline style={{ maxWidth: NEWS_FEED_WIDTH }}>
      {posts.map((post, index) => (
        <Timeline.Item key={post.id}>
          <HobbyPost
            post={post}
            edit={<UpdateHobbyPostModal post={post} />}
            checkVisibility={index === posts.length - 1}
            loadMore={() => {
              const postId = post.id
              const lastPost = posts[posts.length - 1]
              if (lastPost?.id === postId) {
                loadMore(post.id)
              }
            }}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default HobbiesFeedPosts
