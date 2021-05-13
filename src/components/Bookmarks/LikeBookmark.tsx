import { LikeOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import getBookmarks from '../../queries/getBookmarks'
import { Bookmark } from '../../types'
import message from '../../message'
import { PureQueryOptions, useMutation, gql } from "@apollo/client";

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

type BookmarkPick = Pick<Bookmark, 'id' | 'likes' | 'likedByMe'>

interface Props {
  bookmark: BookmarkPick
  refetchQueries?: PureQueryOptions[]
}

export default function LikeBookmark({ bookmark, refetchQueries = [] }: Props) {
  const [toggleBookmarklike] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getBookmarks }, ...refetchQueries],
    onError: message.error,
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
      <LikeOutlined /> {Boolean(count) && count}
    </StyledControl>
  )
}
