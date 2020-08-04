import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import message from '../../message'
import getPost from '../../queries/getPost'
import { Post } from '../../types'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import PostForm from './PostForm'
import { EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

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
            tags: post.tags?.map(tag => ({
              key: tag.name,
              label: tag.name,
              id: tag.id,
            })),
            publishDate: post.publishDate ? dayjs(post.publishDate, 'YYYY-MM-DDTHH:mm:ssZ') : null,
            titleImage: post.titleImage
              ? [
                  {
                    ...post.titleImage,
                    uid: post.titleImage?.id,
                    name: post.titleImage?.fileName,
                  },
                ]
              : null,
            backgroundImage: post.backgroundImage
              ? [
                  {
                    ...post.backgroundImage,
                    uid: post.backgroundImage?.id,
                    name: post.backgroundImage?.fileName,
                  },
                ]
              : null,
            foregroundImage: post.foregroundImage
              ? [
                  {
                    ...post.foregroundImage,
                    uid: post.foregroundImage?.id,
                    name: post.foregroundImage?.fileName,
                  },
                ]
              : null,
            images: post.images?.map(image => ({
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
