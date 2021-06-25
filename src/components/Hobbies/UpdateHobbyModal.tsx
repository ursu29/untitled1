import React from 'react'
import { EditOutlined } from '@ant-design/icons'
import message from '../../message'
import { useUpdateHobbyPostMutation, HobbyPostBaseFragment } from '../../queries/hobbyPosts'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import HobbyPostForm from './HobbyPostForm'

type Props = {
  post: HobbyPostBaseFragment
}

export const UpdateHobbyPostModal = ({ post }: Props) => {
  const [createPost, { loading }] = useUpdateHobbyPostMutation({
    onCompleted: () => message.success('Post has been updated'),
    onError: message.error,
  })

  return (
    <Drawer
      size="large"
      drawerLabel={`Edit ${post.title}`}
      toggler={<Button type="link" size="small" icon={<EditOutlined />} />}
      content={
        <HobbyPostForm
          post={post}
          loading={loading}
          onSubmit={(values, update) => {
            createPost({
              variables: {
                input: { id: post.id, ...values },
              },
              update,
            })
          }}
        />
      }
    />
  )
}
