import React from 'react'
import PageContent from '../UI/PageContent'
import AddFeedback from './AddFeedback'
import FeedbacksList from './FeedbacksList'
import PageHeader from '../UI/PageHeader'
import Helmet from '../Helmet'

export default function FeedbackPage() {
  return (
    <>
      <Helmet title="Feedback" />
      <PageHeader title="Feedback" />
      <PageContent style={{ maxWidth: '600px' }}>
        <AddFeedback />
        <FeedbacksList />
      </PageContent>
    </>
  )
}
