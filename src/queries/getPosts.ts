import gql from 'graphql-tag'
import { Post, Employee, Tag } from '../types'

export default gql`
  query getPosts($first: Int, $after: ID, $filter: PostsFilter) {
    posts(first: $first, after: $after, filter: $filter) {
      id
      title
      body
      isTranslated
      createdAt
      locations
      createdBy {
        id
        name
        email
      }
      images {
        id
        url
        fileName
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
  | 'createdAt'
  | 'locations'
  | 'images'
  | 'annotation'
  | 'isPublic'
  | 'titleImage'
  | 'backgroundImage'
  | 'foregroundImage'
  | 'publishDate'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

export type QueryType = {
  posts: PostPick[]
}
