import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import getPosts from '../../queries/getPosts'
import PostForm from '../UI/PostForm'
import Divider from '../UI/Divider'
import Drawer from '../UI/Drawer'
import Button from '../UI/Button'
import Controls from '../UI/Controls'
import TagSelect from '../Tags/TagSelect'

const mutation = gql`
  mutation createPost($input: CreatePostInput) {
    createPost(input: $input) {
      id
    }
  }
`

export default function CreatePost() {
  const [createPost, { data, loading, error }] = useMutation(mutation, {
    refetchQueries: [{ query: getPosts }],
  })
  return (
    <>
      {/* <PostForm
        loading={loading}
        onSubmit={(values, reset) => {
          createPost({
            variables: { input: values },
            update: () => {
              reset()
            },
          })
        }}
      /> */}
      <Controls>
        <Drawer
          loading={loading}
          Form={PostForm}
          size="large"
          drawerLabel="Create a new post"
          toggler={<Button icon="edit">New post</Button>}
          onSubmit={(values, reset) => {
            createPost({
              variables: { input: values },
              update: () => {
                reset()
              },
            })
          }}
          TagSelect={TagSelect}
        />
      </Controls>
      {/* <Divider /> */}
    </>
  )
}
