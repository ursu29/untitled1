import gql from 'graphql-tag'
import { Evaluation } from '../types'

export default gql`
  query getEvaluations($input: EvaluationsInput!) {
    evaluations(input: $input) {
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
  }
`

export type QueryType = {
  evaluations: Exclude<Evaluation, 'evaluationAttributes'>[]
}
