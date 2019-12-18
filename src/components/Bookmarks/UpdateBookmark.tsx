import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import BookmarkForm from '../UI/BookmarkForm'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'

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
