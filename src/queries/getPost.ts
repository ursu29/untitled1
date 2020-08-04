import gql from 'graphql-tag'
import { Post, Employee, Tag } from '../types'

export default gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      isTranslated
      createdAt
      locations
      annotation
      isPublic
      titleImage {
        id
        url
        fileName
      }
      backgroundImage {
        id
        url
        fileName
      }
      foregroundImage {
        id
        url
        fileName
      }
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
  post: PostPick
}
