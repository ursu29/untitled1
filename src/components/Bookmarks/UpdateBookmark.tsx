import { PureQueryOptions, useMutation, gql } from '@apollo/client'
import React from 'react'
import message from '../../message'
import getBookmarks from '../../queries/getBookmarks'
import { Access, Bookmark, Employee } from '../../types'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import BookmarkForm from './BookmarkForm'

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link' | 'skills'> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  access: Pick<Access, 'write'>
}

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

interface Props {
  bookmark: BookmarkPick
  refetchQueries?: PureQueryOptions[]
}

export default function UpdateBookmark({ bookmark, refetchQueries = [] }: Props) {
  const [updateBookmark, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }, ...refetchQueries],
    onError: message.error,
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
          bookmark={bookmark}
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
