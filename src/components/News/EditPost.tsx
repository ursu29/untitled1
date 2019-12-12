import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import getPosts from '../../queries/getPosts'
import PostForm from '../UI/PostForm'
import Divider from '../UI/Divider'
import Drawer from '../UI/Drawer'
import Button from '../UI/Button'
import Controls from '../UI/Controls'
import { Post } from '../../types'
import TagSelect from '../Tags/TagSelect'

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

export default function EditPost({ post }: Props) {
  const [updatePost, { data, loading, error }] = useMutation(mutation, {
    refetchQueries: [{ query: getPosts }],
  })
  console.log('post', post)
  return (
    <Drawer
      loading={loading}
      Form={PostForm}
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
      size="large"
      drawerLabel="Edit post"
      toggler={<Button type="link" icon="edit"></Button>}
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
  )
}
