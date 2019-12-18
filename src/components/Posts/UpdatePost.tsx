import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import getPosts from '../../queries/getPosts'
import { Post } from '../../types'
import TagSelect from '../Tags/TagSelect'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import PostForm from '../UI/PostForm'
import message from '../../message'

const mutation = gql`
  mutation updatePost($input: UpdatePostInput) {
    updatePost(input: $input) {
      id
    }
  }
`

interface Props {
  post: Partial<Post>
}

export default function UpdatePost({ post }: Props) {
  const [updatePost, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getPosts }],
    onError: message.error,
  })

  return (
    <Drawer
      size="large"
      drawerLabel="Edit post"
      toggler={<Button type="link" size="small" icon="edit"></Button>}
      content={
        <PostForm
          loading={loading}
          TagSelect={TagSelect}
          values={{
            ...post,
            tags: post.tags?.map(tag => ({
              key: tag.name,
              label: tag.name,
              id: tag.id,
            })),
            images: post.images?.map(image => ({
              ...image,
              uid: image.id,
            })),
          }}
          onSubmit={(values, reset) => {
            updatePost({
              variables: {
                input: {
                  id: post.id,
                  ...values,
                },
              },
              update: () => {
                reset()
              },
            })
          }}
        />
      }
    />
  )
}
