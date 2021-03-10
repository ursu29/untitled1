import gql from 'graphql-tag'
import { Bookmark } from '../types'

export default gql`
  query getBookmarks($link: String!) {
    bookmarkByLink(link: $link) {
      id
      title
      link
      skills {
        id
        name
      }
    }
  }
`
type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link' | 'skills'>

export type QueryType = {
  bookmarkByLink: BookmarkPick
}
