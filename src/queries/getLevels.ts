import gql from 'graphql-tag'
import { LEVEL } from '../types'

export default gql`
  {
    levels
  }
`

export type QueryType = {
  levels: LEVEL[]
}
