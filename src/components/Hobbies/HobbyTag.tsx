import styled from 'styled-components'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { getHobbyLink } from '../../paths'
import React from 'react'
import { Hobby } from '../../types/graphql'

const HobbyWrapper = styled(Tag)`
  margin-right: 8px;
  margin-bottom: 8px;
`

const HobbyLink = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

type Props = {
  hobby: Pick<Hobby, 'id' | 'name'>
}

const HobbyTag = ({ hobby }: Props) => (
  <HobbyWrapper key={hobby.id}>
    <HobbyLink to={getHobbyLink(hobby.id)}>{hobby.name}</HobbyLink>
  </HobbyWrapper>
)

export default HobbyTag
