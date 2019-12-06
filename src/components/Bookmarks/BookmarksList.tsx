import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'
import query, {QueryType} from '../../queries/getBookmarks';
import Bookmark from '../UI/Bookmark'

/*const mutation = gql`
    mutation CreateBookmark {
        createBookmark(input:{
            title: "",
                link: "",
                skills: []
        }) {
            id
            title
            skills {
                name
            }
        }
    }
`*/

function BookmarksList() {
  const { data, loading, error } = useQuery<QueryType>(query)
  console.log(data);
  if (!data?.bookmarks) {
    return (
        <div>No bookmarks found</div>
    )
  }
  return (
      <div>
        {data.bookmarks
            .map(item => (
                <Bookmark key={item.id} bookmark={item}/>
            ))}
      </div>
  )
}

export default withRouter(BookmarksList)