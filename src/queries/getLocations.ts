import { gql } from '@apollo/client'
import { LOCATION } from '../types'

export default gql`
  {
    locations
  }
`

export type QueryType = {
  locations: LOCATION[]
}
