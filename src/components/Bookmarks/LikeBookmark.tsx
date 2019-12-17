import React, { useState } from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Icon } from 'antd'
import styled from 'styled-components'
import getBookmarks from '../../queries/getBookmarks'
import { Bookmark } from '../../types'

const StyledControl = styled.span<{ active: Boolean }>`
  text-align: baseline;
  color: ${props => (props.active ? '#4a4a4a' : '#8d96ac')};
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`

const mutation = gql`
  mutation toggleBookmarklike($input: ToggleBookmarklikeInput!) {
    toggleBookmarklike(input: $input) {
      id
    }
  }
`

type MutationType = {
  toggleBookmarklike: {
    id: string
  }
}

type BookmarkPick = Pick<Bookmark, 'id'| 'likes' | 'likedByMe'>

interface Props {
  bookmark: BookmarkPick
}

export default function LikeBookmark({bookmark }: Props) {
  const [toggleBookmarklike, {error}] = useMutation<MutationType>(mutation, {
    refetchQueries: [ {query: getBookmarks} ],
    onError: () => {
      console.info('toggleBookmarklike error', error)
    },
  })
  const handleClick = (e: any) => {
    e.preventDefault()
    toggleBookmarklike({
      variables: {
        input: { bookmark: bookmark.id },
      },
    })
  }
  const count = bookmark.likes && bookmark.likes.length
  return (
    <StyledControl active={bookmark.likedByMe} onClick={handleClick}>
      <Icon type="like" /> {Boolean(count) && count}
    </StyledControl>
  )
}