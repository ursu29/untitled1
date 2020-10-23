import React, { useState } from 'react'
import { Avatar, Button, Comment, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ProjectTag from '../Projects/ProjectTag'
import { Feedback, FeedbackComment } from '../../types'
import { UserOutlined } from '@ant-design/icons'
import { FeedbackReplyForm } from './ReplyFeedback'

dayjs.extend(relativeTime)

const { Paragraph } = Typography

const CommentMessage = ({ comment }: { comment: FeedbackComment }) => (
  <Comment
    author="Manager"
    avatar={<Avatar shape="circle" icon={<UserOutlined />} alt="Manager" />}
    datetime={<span>{dayjs().to(dayjs(comment.createdAt))}</span>}
    content={<Paragraph style={{ margin: 0, whiteSpace: 'pre-line' }}>{comment.text}</Paragraph>}
  />
)

const ToggledFeedbackReplyForm = ({ feedbackId }: { feedbackId: string }) => {
  const [showForm, setShowForm] = useState(false)
  return showForm ? (
    <FeedbackReplyForm feedbackId={feedbackId} onClose={() => setShowForm(false)} />
  ) : (
    <Button onClick={() => setShowForm(true)}>Reply</Button>
  )
}

export const FeedbackMessage = ({
  feedback,
  canReply,
}: {
  feedback: Feedback
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
      <Paragraph style={{ marginTop: '13px', maxWidth: '600px', whiteSpace: 'pre-line' }}>
        {feedback.text}
      </Paragraph>
      {feedback.comments.map(comment => (
        <CommentMessage key={comment.id} comment={comment} />
      ))}
      {canReply && <ToggledFeedbackReplyForm feedbackId={feedback.id} />}
    </>
  )
}
