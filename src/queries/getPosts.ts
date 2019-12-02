import gql from 'graphql-tag'
import { Post, Employee } from '../types'

export default gql`
  {
    posts {
      id
      title
      body
      bodyTranslated
      createdAt
      updatedAt
      createdBy {
        id
        name
        email
      }
      images {
        id
        url
      }
    }
  }
`

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
}

export type QueryType = {
  posts: PostPick[]
}
