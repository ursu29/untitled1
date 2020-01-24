import { useMutation } from '@apollo/react-hooks'
import { PureQueryOptions } from 'apollo-client'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import BookmarkForm from '../UI/BookmarkForm'
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
    <>
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
    </>
  )
}
