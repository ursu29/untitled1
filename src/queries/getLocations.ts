import gql from 'graphql-tag'
import { LOCATION } from '../types'

export default gql`
  {
    locations
  }
`

export type QueryType = {
  locations: LOCATION[]
}
