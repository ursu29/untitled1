import React, { useState } from 'react'
import BookmarkDrawer from '../UI/BookmarkDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import Button from '../UI/Button'
import message from '../../message'
import Drawer from '../UI/Drawer'
import BookmarkForm from '../UI/BookmarkForm'

const mutation = gql`
  mutation updateBookmark($input: UpdateBookmarkInput!) {
    updateBookmark(input: $input) {
      id
    }
  }
`

type MutationType = {
  updateBookmark: {
    id: string
  }
}

export default function UpdateBookmark({ ...props }) {
  const [updateBookmark, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }],
    onError: () => message.error,
    onCompleted: () => message.success('Bookmark is updated'),
  })

  return (
    <Drawer
      toggler={
        <Button type="link" size="small" style={{ paddingLeft: 0 }}>
          Edit
        </Button>
      }
      drawerLabel="Create bookmark"
      content={
        <BookmarkForm
          loading={loading}
          bookmark={props.bookmark}
          onSubmit={(bookmark: any, update) => {
            updateBookmark({
              variables: { input: bookmark },
              update,
            })
          }}
        />
      }
    />
  )
}
