import React from 'react'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'
import AddFeedback from './AddFeedback'
import FeedbacksList from './FeedbacksList'

export default function FeedbackPage() {
  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>Feedback</Typography.Title>
      <AddFeedback />
      <FeedbacksList />
    </PageContent>
  )
}
