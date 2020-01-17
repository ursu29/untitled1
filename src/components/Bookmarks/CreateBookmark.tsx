import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import BookmarkForm from '../UI/BookmarkForm'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillTreeSelect from '../Skills/SkillTreeSelect'

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
              SkillTreeSelect={SkillTreeSelect}
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
    </>
  )
}
