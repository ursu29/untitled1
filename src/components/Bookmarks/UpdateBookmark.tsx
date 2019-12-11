import React, { useState } from 'react'
import BookmarkDrawer from '../UI/BookmarkDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'

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
  })
  return (
    <BookmarkDrawer
      togglerText="Edit"
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