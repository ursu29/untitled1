import gql from 'graphql-tag'
import { Evaluation, EvaluationComment } from '../types'

export default gql`
  query getEvaluations(
    $evaluationsInput: EvaluationsInput!
    $evaluationCommentsInput: EvaluationCommentsInput!
  ) {
    evaluations(input: $evaluationsInput) {
      id
      updatedAt
      fromWho {
        id
        name
      }
      toWhom {
        id
        name
      }
      comment
      evaluation
      evaluationAttribute {
        id
      }
    }
    evaluationComments(input: $evaluationCommentsInput) {
      id
      body
      evaluationAttribute {
        id
      }
      editable
    }
  }
`

export type QueryType = {
  evaluations: Exclude<Evaluation, 'evaluationAttributes'>[]
  evaluationComments: Exclude<EvaluationComment, 'employee'>[]
}
