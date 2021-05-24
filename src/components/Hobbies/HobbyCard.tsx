import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getHobbyLink } from '../../paths'
import { HobbyBaseFragment } from '../../queries/hobbies'

const HobbyWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 2px;
  padding: 20px;
`

const HobbyTitle = styled(Link)`
  cursor: pointer;
  font-size: 24px;
  color: black;
  &:hover {
    color: #1890ff;
  }
`

const HobbyDescription = styled(Typography.Paragraph)`
  margin: 20px 0 20px 0;
`

type Props = {
  hobby: HobbyBaseFragment
}

export const HobbyCard: React.FC<Props> = ({ hobby }) => {
  return (
    <HobbyWrapper>
      <HobbyTitle to={getHobbyLink(hobby.id)}>{hobby.name}</HobbyTitle>
      <HobbyDescription ellipsis={{ rows: 4 }}>{hobby.description}</HobbyDescription>
    </HobbyWrapper>
  )
}
