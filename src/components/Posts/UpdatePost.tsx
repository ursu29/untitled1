import { useMutation, gql } from "@apollo/client";
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import message from '../../message'
import getPost from '../../queries/getPost'
import { Post, Tag } from '../../types'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import PostForm from './PostForm'

const mutation = gql`
  mutation updatePost($input: UpdatePostInput) {
    updatePost(input: $input) {
      id
    }
  }
`

interface Props {
  post: Pick<
    Post,
    'id' | 'title' | 'body' | 'isTranslated' | 'createdAt' | 'locations' | 'images'
  > & {
    tags?: Pick<Tag, 'id' | 'name' | 'description'>[]
  }
}

export default function UpdatePost({ post }: Props) {
  const [updatePost, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query: getPost, variables: { id: post.id } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  return (
    <Drawer
      size="large"
      drawerLabel="Edit post"
      toggler={<Button type="link" size="small" icon={<EditOutlined />}></Button>}
      content={
        <PostForm
          loading={loading}
          values={{
            ...post,
            tags: post.tags?.map((tag: any) => ({
              key: tag.name,
              label: tag.name,
              id: tag.id,
              name: tag.name,
            })),
            images: post.images?.map((image: any) => ({
              ...image,
              uid: image.id,
              name: image.fileName,
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
