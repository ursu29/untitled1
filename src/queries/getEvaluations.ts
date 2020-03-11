import gql from 'graphql-tag'
import { Evaluation, EvaluationComment } from '../types'

export default gql`
  query getEvaluations(
    $evaluationsInput: EvaluationsInput!
    $evaluationCommmentsInput: EvaluationCommentsInput!
  ) {
    evaluations(input: $evaluationsInput) {
      id
      fromWho {
        id
        name
      }
      toWhom {
        id
        name
      }
      evaluation
      evaluationAttribute {
        id
      }
    }
    evaluationComments(input: $evaluationCommmentsInput) {
      id
      body
      evaluationAttribute {
        id
      }
    }
  }
`

export type QueryType = {
  evaluations: Exclude<Evaluation, 'evaluationAttributes'>[]
  evaluationComments: Exclude<EvaluationComment, 'employee'>[]
}
