import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import getPosts from '../../queries/getPosts'
import PostForm from '../UI/PostForm'

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
    <PostForm
      loading={loading}
      onSubmit={(values, reset) => {
        createPost({
          variables: { input: values },
          update: () => {
            reset()
          },
        })
      }}
    />
  )
}
