import gql from 'graphql-tag'
import { Access, Feedback, FeedbackComment } from '../types'

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
      text
      createdAt
    }
  }
`

export const feedbackAccess = gql`
  query feedbackAccess {
    feedbacksAccess {
      write
    }
  }
`

export type FeedbackQueryType = {
  feedbacks: Feedback[]
}

export type ReplyFeedbackQueryType = {
  replyFeedback: FeedbackComment
}

export type FeedbackAccessQueryType = {
  feedbacksAccess: Pick<Access, 'write'>
}
