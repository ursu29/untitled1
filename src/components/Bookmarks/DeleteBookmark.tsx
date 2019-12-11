import React, { useState } from 'react'
import { Popconfirm } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getBookmarks from '../../queries/getBookmarks'
import styled from 'styled-components'

const StyledControl = styled.span`
  color: #8d96ac;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`

const mutation = gql`
  mutation deleteBookmark($input: DeleteBookmarkInput!) {
    deleteBookmark(input: $input) {
      id
    }
  }
`

type MutationType = {
  deleteBookmark: {
    id: string
  }
}

export default function DeleteBookmark({ ...props }) {
  const [bookmark] = useState<any>(props.bookmark)
  const [deleteBookmark, {error}] = useMutation<MutationType>(mutation, {
    refetchQueries: [ {query: getBookmarks} ],
    onError: () => {
      console.info('deleteBookmark error', error)
    },
  })
  const handleDelete = () =>
    deleteBookmark({
      variables: {
        input: { id: bookmark.id }
      },
    })
  return (
    <Popconfirm
      placement="top"
      title={'Are you sure you want to delete this bookmark?'}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <StyledControl>Delete</StyledControl>
    </Popconfirm>
  )
}