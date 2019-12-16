import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import paths from '../../paths'
import getPosts, { QueryType } from '../../queries/getPosts'
import Button from '../UI/Button'
import Controls from '../UI/Controls'
import Divider from '../UI/Divider'
import PageContent from '../UI/PageContent'
import Post from '../UI/Post'
import Skeleton from '../UI/Skeleton'

function PostPage({ match, history }: RouteComponentProps<{ id: string }>) {
  const { data: preData, loading: preloading } = useQuery<QueryType>(getPosts)
  const [load, { data, loading }] = useLazyQuery<QueryType>(getPosts, {
    variables: { input: { id: match.params.id } },
  })

  useEffect(() => {
    if (preData?.posts?.length) {
      const post = preData.posts[0]
      if (post.id === match.params.id) {
        history.push(paths.POSTS)
      }
    } else load()
  })

  const post = data?.posts?.[0]

  return (
    <PageContent>
      <Controls back={<Button icon="arrow-left" onClick={() => history.push(paths.POSTS)} />} />
      <Divider />
      <Skeleton active loading={preloading || loading}>
        {post && <Post post={post} />}
        {!post && <div>Post is not found</div>}
      </Skeleton>
    </PageContent>
  )
}

export default withRouter(PostPage)
