import React, { useState } from 'react'
import BookmarkDrawer from '../UI/BookmarkDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import styled from 'styled-components'

const Controls = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`

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

export default function CreateBookmark() {
  const [bookmark, setBookmark] = useState<any>(null)
  const [createBookmark, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }],
    onError: () => {
      console.info('createBookmark error', error)
    },
  })
  return (
    <Controls>
      <BookmarkDrawer
        togglerLabel="Add"
        icon="plus"
        drawerLabel="Create bookmark"
        bookmark={bookmark}
        loading={loading}
        onSubmit={(bookmark, onDone) => {
          setBookmark(bookmark)
          createBookmark({ variables: { input: bookmark }, update: onDone })
        }}
      />
    </Controls>
  )
}
