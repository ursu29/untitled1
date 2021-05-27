import { gql } from '@apollo/client'
import { EvaluationReviewer, Employee } from '../types'

export default gql`
  query getEvaluationReviewers($input: EvaluationReviewersInput) {
    evaluationReviewers(input: $input) {
      toWhom {
        id
        name
        email
      }
      fromWho {
        id
        name
        email
        isMe
      }
    }
  }
`

export type QueryType = {
  evaluationReviewers: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
    toWhom: Pick<Employee, 'id' | 'name' | 'email'>
  }[]
}
