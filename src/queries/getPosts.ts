import gql from 'graphql-tag'
import { Post, Employee, Tag } from '../types'

export default gql`
  query getPosts($input: PostsInput) {
    posts(input: $input) {
      id
      title
      titleTranslated
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
  | 'titleTranslated'
  | 'body'
  | 'bodyTranslated'
  | 'createdAt'
  | 'updatedAt'
  | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

export type QueryType = {
  posts: PostPick[]
}
