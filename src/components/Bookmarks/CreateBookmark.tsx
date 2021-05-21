import { PureQueryOptions, useMutation, gql } from "@apollo/client";
import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import BookmarkForm from './BookmarkForm'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'

const mutation = gql`
  mutation createBookmark($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
    }
  }
`

type MutationType = {
  createBookmark: {
    id: string
  }
}

interface Props {
  refetchQueries?: PureQueryOptions[]
}

export default function CreateBookmark({ refetchQueries = [] }: Props) {
  const [createBookmark, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }, ...refetchQueries],
    onError: message.error,
    onCompleted: () => message.success('Bookmark is added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating bookmark')
    }
  })

  return (
    <div data-cy="bookmark">
      <Drawer
        toggler={<Button icon={<PlusOutlined />}>Add bookmark</Button>}
        drawerLabel="Create bookmark"
        content={
          <BookmarkForm
            loading={loading}
            onSubmit={(bookmark: any, update: any) => {
              createBookmark({
                variables: { input: bookmark },
                update,
              })
            }}
          />
        }
      />
    </div>
  )
}
