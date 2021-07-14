import { Typography, Comment, Button } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import {
  HobbyPostPreviewFragment,
  HobbyPostCommentBaseFragment,
  HobbyPostBaseFragment,
} from '../../queries/hobbyPosts'
import RichText from '../UI/RichText'
import EmployeeLink from '../Employees/EmployeeLink'
import HobbyTag from './HobbyTag'
import Avatar from '../Avatar'
import { UpdateHobbyPostModal } from './UpdateHobbyModal'
import ReplyHobbyPost from './ReplyHobbyPost'

const { Text, Title, Paragraph } = Typography

const StyledWrapper = styled.div`
  margin: 16px 0;
`

const StyledHeader = styled(Text).attrs({ type: 'secondary' })`
  margin-bottom: 8px;
`

const StyledTitle = styled(Title).attrs({ level: 3 })`
  && {
    margin-top: 8px;
    margin-bottom: 0;
  }
`

const StyledRichText = styled(RichText)`
  margin: 16px 0;
`

const StyledComments = styled.div`
  margin: 8px 8px 0 16px;
`

const StyledCommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledCommentsTitle = styled.div`
  font-size: 18px;
  line-height: 24px;
`

const PostCreatedAt = ({ post }: { post: HobbyPostPreviewFragment }) => {
  if (!post.createdAt) return null
  return (
    <div>
      <StyledHeader>{dayjs(post.createdAt).format('YYYY MMM DD HH:MM')}</StyledHeader>
    </div>
  )
}

const PostEvent = ({ post }: { post: HobbyPostPreviewFragment }) => {
  if (!post.eventDate && !post.eventLocation) return null
  const values = [post.eventLocation, post.eventDate && dayjs(post.eventDate).format('YYYY MMM DD')]
    .filter(Boolean)
    .join(', ')
  return (
    <div>
      <Text type="secondary">Event: {values}</Text>
    </div>
  )
}

const PostHobbyList = ({ post }: { post: HobbyPostPreviewFragment }) => {
  if (!post.hobbies) return null
  return (
    <div>
      {post.hobbies.map(hobby => (
        <HobbyTag key={hobby.id} hobby={hobby} />
      ))}
    </div>
  )
}

const EmployeeComment = ({ comment }: { comment: HobbyPostCommentBaseFragment }) => (
  <Comment
    author={comment.createdBy?.name}
    avatar={comment.createdBy && <Avatar employee={comment.createdBy} />}
    datetime={comment.createdAt && <span>{dayjs().to(dayjs(comment.createdAt))}</span>}
    content={<Paragraph style={{ margin: 0, whiteSpace: 'pre-line' }}>{comment.body}</Paragraph>}
  />
)

const HobbyComments = ({ post }: { post: HobbyPostBaseFragment }) => {
  const [showComments, setShowComments] = useState(false)
  const comments = showComments ? post.comments : post.comments?.slice(-1)
  const totalComments = post.comments?.length || 0
  const isCollapsible = totalComments > 1

  return (
    <StyledComments>
      <StyledCommentsHeader>
        <div>
          <StyledCommentsTitle>Comments</StyledCommentsTitle>
          <Text type="secondary">{totalComments} comments</Text>
        </div>
        {isCollapsible && (
          <Button type="link" size="small" onClick={() => setShowComments(prev => !prev)}>
            {!showComments ? 'See all comments' : 'Collapse comments'}
          </Button>
        )}
      </StyledCommentsHeader>
      {comments?.map(comment => (
        <EmployeeComment key={comment.id} comment={comment} />
      ))}
      <ReplyHobbyPost postId={post.id} />
    </StyledComments>
  )
}

export const HobbyPostPreview = ({ post }: { post: HobbyPostPreviewFragment }) => (
  <StyledWrapper>
    <PostCreatedAt post={post} />
    <StyledTitle>{post.title}</StyledTitle>
    <PostEvent post={post} />
    {post.createdBy && <EmployeeLink employee={post.createdBy} />}
    <StyledRichText text={post.body} />
    <PostHobbyList post={post} />
  </StyledWrapper>
)

export const HobbyPostFull = ({ post }: { post: HobbyPostBaseFragment }) => (
  <StyledWrapper>
    <PostCreatedAt post={post} />
    <StyledTitle>
      {post.title} {post.editable && <UpdateHobbyPostModal post={post} />}
    </StyledTitle>
    <PostEvent post={post} />
    {post.createdBy && <EmployeeLink employee={post.createdBy} />}
    <StyledRichText text={post.body} />
    <PostHobbyList post={post} />
    <HobbyComments post={post} />
  </StyledWrapper>
)
