import React, { useState } from 'react'
import BookmarkDrawer from '../UI/BookmarkDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import Button from '../UI/Button'
import message from '../../message'

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
  const [bookmark, setBookmark] = useState<any>(props.bookmark)
  const [updateBookmark, {loading, error}] = useMutation<MutationType>(mutation, {
    refetchQueries: [{query: getBookmarks}],
    onError: () => {
      console.info('updateBookmark error', error)
    },
    onCompleted: () => message.success('Bookmark is updated')
  })
  return (
    <BookmarkDrawer
      toggler={<Button size="small" type="link">Edit</Button>}
      drawerLabel="Edit bookmark"
      bookmark={bookmark}
      loading={loading}
      onSubmit={(bookmark, onDone) => {
        setBookmark(bookmark)
        updateBookmark({variables: {input: bookmark}, update: onDone})
      }}
    />
  )
}