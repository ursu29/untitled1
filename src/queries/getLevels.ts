import gql from 'graphql-tag'
import { Level } from '../types'

export default gql`
  {
    levels {
      id
      index
      name
      description
    }
  }
`

export type QueryType = {
  levels: Pick<Level, 'id' | 'index' | 'name' | 'description'>[]
}
