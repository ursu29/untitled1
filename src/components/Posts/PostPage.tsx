import React, { useEffect } from 'react'
import UnderConstruction from '../UI/UnderConstruction'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import getPosts, { QueryType } from '../../queries/getPosts'
import paths from '../../paths'

function PostPage({ match, history }: RouteComponentProps<{ id: string }>) {
  const { data, loading, error } = useQuery<QueryType>(getPosts)

  useEffect(() => {
    if (data?.posts?.length) {
      const post = data.posts[0]
      if (post.id === match.params.id) {
        history.push(paths.POSTS)
      }
    }
  })

  return <UnderConstruction />
}

export default withRouter(PostPage)
