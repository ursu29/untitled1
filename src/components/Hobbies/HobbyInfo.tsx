import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { HobbyFullFragment } from '../../queries/hobbies'
import EmployeesList from '../Employees/EmployeesList'

const HobbyWrapper = styled.div`
  padding: 20px;
`

const HobbyDescription = styled(Typography.Paragraph)`
  margin: 20px 0 20px 0;
`

const HobbySubTitle = styled.h6`
  font-size: 18px;
  margin: 0;
`

type Props = {
  hobby: HobbyFullFragment
}

export const HobbyInfo: React.FC<Props> = ({ hobby }) => {
  return (
    <HobbyWrapper>
      <HobbyDescription ellipsis={{ rows: 4 }}>{hobby.description}</HobbyDescription>
      <HobbySubTitle>Members</HobbySubTitle>
      {/* @ts-ignore: conflict types of employees */}
      <EmployeesList employees={hobby.members} loading={false} />
    </HobbyWrapper>
  )
}
