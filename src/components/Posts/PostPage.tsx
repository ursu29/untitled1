import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import query, { QueryType } from '../../queries/getPost'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import paths from '../../paths'
import PageContent from '../UI/PageContent'
import Post from './Post'
import Skeleton from '../UI/Skeleton'

function PostPage({ match, history }: RouteComponentProps<{ id: string }>) {
  const { data: preData, loading: preloading } = useQuery<QueryType>(query)
  const [load, { data, loading }] = useLazyQuery<QueryType>(query, {
    variables: { id: match.params.id },
  })

  useEffect(() => {
    if (preData?.post) {
      const post = preData.post
      if (post.id === match.params.id) {
        history.push(paths.POSTS)
      }
    } else load()
  })

  const post = data?.post

  return (
    <PageContent>
      <Controls back={<Back />} />
      <Skeleton active loading={preloading || loading}>
        {post && <Post post={post} />}
        {!post && <div>Post is not found</div>}
      </Skeleton>
    </PageContent>
  )
}

export default withRouter(PostPage)
