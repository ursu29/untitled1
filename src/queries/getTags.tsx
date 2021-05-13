import { gql } from "@apollo/client";
import { Tag } from '../types'

export default gql`
  {
    tags {
      id
      name
      description
    }
  }
`

type QueryPick = Pick<Tag, 'id' | 'name' | 'description'>

export type QueryType = {
  tags: QueryPick[]
}
