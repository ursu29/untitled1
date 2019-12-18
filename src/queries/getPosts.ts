import gql from 'graphql-tag'
import { Post, Employee, Tag } from '../types'

export default gql`
  query getPosts($input: PostsInput) {
    posts(input: $input) {
      id
      title
      body
      isTranslated
      titleTranslated
      bodyTranslated
      createdAt
      updatedAt
      locations
      createdBy {
        id
        name
        email
      }
      images {
        id
        url
      }
      tags {
        id
        name
        description
      }
    }
  }
`

type PostPick = Pick<
  Post,
  | 'id'
  | 'title'
  | 'body'
  | 'isTranslated'
  | 'titleTranslated'
  | 'bodyTranslated'
  | 'createdAt'
  | 'updatedAt'
  | 'locations'
  | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

export type QueryType = {
  posts: PostPick[]
}
