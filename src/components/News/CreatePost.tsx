import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import getPosts from '../../queries/getPosts'
import PostForm from '../UI/PostForm'
import Button from '../UI/Button'
import Controls from '../UI/Controls'
import TagSelect from '../Tags/TagSelect'
import Drawer from '../UI/Drawer'
import message from '../../message'

const mutation = gql`
  mutation createPost($input: CreatePostInput) {
    createPost(input: $input) {
      id
    }
  }
`

export default function CreatePost() {
  const [createPost, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getPosts }],
    onError: message.error,
    onCompleted: () => message.success('New post created'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating new post')
    }
  })

  return (
    <>
      <Controls>
        <Drawer
          size="large"
          drawerLabel="Create a new post"
          toggler={<Button icon="edit">New post</Button>}
          content={
            <PostForm
              loading={loading}
              TagSelect={TagSelect}
              onSubmit={(values, update) => {
                createPost({
                  variables: { input: values },
                  update,
                })
              }}
            />
          }
        />
      </Controls>
    </>
  )
}
