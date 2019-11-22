import React, { useRef } from 'react'
import PostForm from '../UI/PostForm'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getPosts, { QueryType } from '../../queries/getPosts'

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
