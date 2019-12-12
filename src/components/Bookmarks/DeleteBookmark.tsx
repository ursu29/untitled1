import React, { useState } from 'react'
import { Popconfirm } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import Button from '../UI/Button'
import message from '../../message'

const mutation = gql`
  mutation deleteBookmark($input: DeleteBookmarkInput!) {
    deleteBookmark(input: $input) {
      id
    }
  }
`

type MutationType = {
  deleteBookmark: {
    id: string
  }
}

export default function DeleteBookmark({ ...props }) {
  const [bookmark] = useState<any>(props.bookmark)
  const [deleteBookmark, {error}] = useMutation<MutationType>(mutation, {
    refetchQueries: [ {query: getBookmarks} ],
    onError: () => {
      console.info('deleteBookmark error', error)
    },
    onCompleted: () => message.success('Bookmark is deleted')
  })
  const handleDelete = () =>
    deleteBookmark({
      variables: {
        input: { id: bookmark.id }
      },
    })
  return (
    <Popconfirm
      placement="top"
      title={'Are you sure you want to delete this bookmark?'}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link" size="small">Delete</Button>
    </Popconfirm>
  )
}