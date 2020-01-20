import gql from 'graphql-tag'
import { EvaluationAttribute } from '../types'

export default gql`
  {
    evaluationAttributes {
      id
      title
      description
      group
      index
    }
  }
`

export type QueryType = {
  evaluationAttributes: Exclude<EvaluationAttribute, 'evaluations'>[]
}
