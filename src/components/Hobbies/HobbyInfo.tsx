import React from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { HobbyFullFragment } from '../../queries/hobbies'
import EmployeesList from '../Employees/EmployeesList'

const HobbyNoDescription = styled(Typography.Paragraph)`
  color: gray;
  font-style: italic;
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
    <div>
      <HobbySubTitle>Description</HobbySubTitle>
      {hobby.description ? (
        <Typography.Paragraph>{hobby.description}</Typography.Paragraph>
      ) : (
        <HobbyNoDescription>(the hobby has no description)</HobbyNoDescription>
      )}
      <HobbySubTitle>Members</HobbySubTitle>
      {/* @ts-ignore: conflict types of employees */}
      <EmployeesList employees={hobby.members} loading={false} />
    </div>
  )
}
