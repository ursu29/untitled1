import React, { useState, useEffect } from 'react'
import BookmarkDrawer from '../UI/BookmarkDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import styled from 'styled-components'
import Button from '../UI/Button'
import message from '../../message'
import Drawer from '../UI/Drawer'
import BookmarkForm from '../UI/BookmarkForm'
import Divider from '../UI/Divider'

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
  const [createBookmark, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }],
    onError: message.error,
    onCompleted: () => message.success('Bookmark is added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating bookmark')
    }
  })

  return (
    <>
      <Controls>
        <Drawer
          toggler={<Button icon="plus">Add bookmark</Button>}
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
      </Controls>
      <Divider />
    </>
  )
}
