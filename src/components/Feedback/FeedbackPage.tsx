import React from 'react'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'
import AddFeedback from './AddFeedback'
import FeedbacksList from './FeedbacksList'

export default function FeedbackPage() {
  return (
    <PageContent style={{ maxWidth: '600px' }}>
      <Typography.Title style={{ marginBottom: '40px' }}>Feedback</Typography.Title>
      <AddFeedback />
      <FeedbacksList />
    </PageContent>
  )
}
