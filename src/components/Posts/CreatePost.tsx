import { useMutation, gql } from "@apollo/client";
import React, { useEffect } from 'react'
import { EditOutlined } from '@ant-design/icons'
import message from '../../message'
import getPosts from '../../queries/getPosts'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import PostForm from './PostForm'

const mutation = gql`
  mutation createPost($input: CreatePostInput) {
    createPost(input: $input) {
      id
    }
  }
`

export default function CreatePost({ filter }: any) {
  const [createPost, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getPosts, variables: { first: 4, filter } }],
    onError: message.error,
    onCompleted: () => message.success('New post created'),
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating new post')
    }
  })

  return (
    <Drawer
      size="large"
      drawerLabel="Create a new post"
      toggler={<Button icon={<EditOutlined />}>New post</Button>}
      content={
        <PostForm
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
