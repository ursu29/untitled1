import gql from 'graphql-tag'
import {Bookmark, Employee, Skill} from '../types'

export default gql `
  {
    bookmarks {
      id
      title
      link
      employee {
        id
        name
        email
      }
      skills {
        id
        name
      }
      likes {
        id
      }
      access {
        read
        write
      }
      createdAt
      likedByMe
    }
  }
`
type BookmarkPick = Pick<
    Bookmark,
    'id' | 'title' | 'link' | 'skills'| 'likes' | 'access' | 'createdAt' | 'likedByMe'
> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>,
  skill: Pick<Skill, 'id' | 'name'>
}

export type QueryType = {
  bookmarks: BookmarkPick[]
}