import React from 'react'
import { Avatar, Comment, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectTag from '../Projects/ProjectTag'
import { Feedback } from '../../types'
import { UserOutlined } from '@ant-design/icons'
import { FeedbackReplyForm } from './ReplyFeedback'

dayjs.extend(relativeTime)

const { Paragraph } = Typography

type FeedbackComment = {
  id: string
  createdAt: string
  text: string
}

const comments: FeedbackComment[] = [
  {
    id: 'test1',
    createdAt: '2020/10/1',
    text:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  },
  {
    id: 'test2',
    createdAt: '2020/11/1',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

const CommentMessage = ({ comment }: { comment: FeedbackComment }) => (
  <Comment
    author="Manager"
    avatar={<Avatar shape="circle" icon={<UserOutlined />} alt="Manager" />}
    datetime={<span>{dayjs().to(dayjs(comment.createdAt))}</span>}
    content={comment.text}
  />
)

export const FeedbackMessage = ({
  feedback,
  showComment,
  canReply,
}: {
  feedback: Feedback
  showComment?: boolean
  canReply?: boolean
}) => {
  return (
    <>
      <Space size="middle" align="start" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
        {dayjs().to(dayjs(feedback.createdAt))}
        <div style={{ fontWeight: 'bold' }}>{feedback.about}</div>
        {feedback.project && (
          <ProjectTag
            small={true}
            key={feedback.project.id}
            project={feedback.project}
            leading={false}
          />
        )}
      </Space>
      <Paragraph style={{ marginTop: '13px', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>
        {feedback.text}
      </Paragraph>
      {showComment &&
        comments.map(comment => <CommentMessage key={comment.id} comment={comment} />)}
      {canReply && <FeedbackReplyForm feedbackId={feedback.id} />}
    </>
  )
}
