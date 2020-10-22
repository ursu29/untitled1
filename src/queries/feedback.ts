import gql from 'graphql-tag'
import { Feedback } from '../types'

export const getFeedbacks = gql`
  query getFeedbacks($input: FeedbacksInput!) {
    feedbacks(input: $input) {
      id
      about
      project {
        id
        name
        code
      }
      text
      createdAt
      comments {
        id
        text
        createdAt
      }
    }
  }
`

export const addFeedback = gql`
  mutation addFeedback($input: FeedbackInput!) {
    addFeedback(input: $input) {
      id
    }
  }
`

export const replyFeedback = gql`
  mutation replyFeedback($input: FeedbackReplyInput!) {
    replyFeedback(input: $input) {
      id
    }
  }
`

export type FeedbackQueryType = {
  feedbacks: Feedback[]
}
