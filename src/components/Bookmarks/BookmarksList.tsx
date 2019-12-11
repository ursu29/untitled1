import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import query, {QueryType} from '../../queries/getBookmarks';
import Bookmark from '../UI/Bookmark'

function BookmarksList() {
  const { data, loading, error } = useQuery<QueryType>(query)
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