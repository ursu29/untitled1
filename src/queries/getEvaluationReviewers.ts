import gql from 'graphql-tag'
import { EvaluationReviewer, Employee } from '../types'

export default gql`
  query getEvaluationRevieers($input: EvaluationReviewersInput) {
    evaluationReviewers(input: $input) {
      id
      toWhom {
        id
        name
      }
      fromWho {
        id
        name
        isMe
      }
    }
  }
`

export type QueryType = {
  evaluationReviewers: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name' | 'isMe'>
    toWhom: Pick<Employee, 'id' | 'name'>
  }[]
}