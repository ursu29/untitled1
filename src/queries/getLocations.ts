import gql from 'graphql-tag'
import { Location } from '../types'

export default gql`
  {
    locations {
      id
      name
      code
      description
    }
  }
`

export type QueryType = {
  locations: Pick<Location, 'id' | 'name' | 'code' | 'description'>[]
}
