import { gql } from "@apollo/client";
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
  'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'locations' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
}

export type QueryType = {
  post: PostPick
}
