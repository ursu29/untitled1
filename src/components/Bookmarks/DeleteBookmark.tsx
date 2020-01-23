import { useMutation } from '@apollo/react-hooks'
import { Popconfirm } from 'antd'
import gql from 'graphql-tag'
import React from 'react'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import { Bookmark } from '../../types'
import Button from '../UI/Button'
import { PureQueryOptions } from 'apollo-client'

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

type BookmarkPick = Pick<Bookmark, 'id'>

interface Props {
  bookmark: BookmarkPick
  refetchQueries?: PureQueryOptions[]
}

export default function DeleteBookmark({ bookmark, refetchQueries = [] }: Props) {
  const [deleteBookmark] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }, ...refetchQueries],
    onError: message.error,
    onCompleted: () => message.success('Bookmark is deleted'),
  })
  const handleDelete = (e: any) => {
    // e.preventDefault()
    deleteBookmark({
      variables: {
        input: { id: bookmark.id },
      },
    })
  }
  return (
    <Popconfirm
      placement="top"
      title={'Are you sure you want to delete this bookmark?'}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <span>
        <Button type="link" size="small">
          Delete
        </Button>
      </span>
    </Popconfirm>
  )
}
