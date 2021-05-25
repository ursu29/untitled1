import React from 'react'
import PageContent from '../UI/PageContent'
import AddFeedback from './AddFeedback'
import FeedbacksList from './FeedbacksList'
import PageHeader from '../UI/PageHeader'

export default function FeedbackPage() {
  return (
    <>
      <PageHeader title="Feedback" />
      <PageContent style={{ maxWidth: '600px' }}>
        <AddFeedback />
        <FeedbacksList />
      </PageContent>
    </>
  )
}
