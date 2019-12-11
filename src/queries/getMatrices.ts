import gql from 'graphql-tag'
import { Matrix } from '../types'

export default gql`
  {
    matrices {
      id
      title
      description
    }
  }
`

export type QueryType = {
  matrices: Pick<Matrix, 'id' | 'title' | 'description'>[]
}
