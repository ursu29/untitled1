import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { Hobby } from '../../types/graphql'

const HobbyWrapper = styled.div`
  padding: 20px;
`

const HobbyDescription = styled(Typography.Paragraph)`
  margin: 20px 0 20px 0;
`

type Props = {
  hobby: Hobby
}

// TODO: employees
export const HobbyInfo: React.FC<Props> = ({ hobby }) => {
  return (
    <HobbyWrapper>
      <HobbyDescription ellipsis={{ rows: 4 }}>{hobby.description}</HobbyDescription>
    </HobbyWrapper>
  )
}
