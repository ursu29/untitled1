import { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions'
import React from 'react'
import message from '../../message'
import { useCreateHobbyPostMutation } from '../../queries/hobbyPosts'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import HobbyPostForm from './HobbyPostForm'

type Props = {
  refetchQueries: RefetchQueryDescription
}

export const CreateHobbyPostModal = ({ refetchQueries }: Props) => {
  const [createPost, { loading }] = useCreateHobbyPostMutation({
    onCompleted: () => message.success('New post has been created'),
    onError: message.error,
    refetchQueries,
    awaitRefetchQueries: true,
  })

  return (
    <Drawer
      size="large"
      drawerLabel="Create a new post"
      toggler={
        <Button type="primary" data-cy="createPost">
          New post
        </Button>
      }
      content={
        <HobbyPostForm
          loading={loading}
          onSubmit={(values, update) => {
            createPost({
              variables: { input: values },
              update,
            })
          }}
        />
      }
    />
  )
}
