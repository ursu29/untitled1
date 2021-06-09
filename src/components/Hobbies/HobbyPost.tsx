import { Typography } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { HobbyPostBaseFragment } from '../../queries/hobbyPosts'
import RichText from '../UI/RichText'
import EmployeeLink from '../Employees/EmployeeLink'
import HobbyTag from './HobbyTag'

const { Text, Title } = Typography

const StyledWrapper = styled.div`
  margin: 16px 0;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledEmployeeLink2 = styled(EmployeeLink)`
  color: rgba(0, 0, 0, 0.65);
`

type Props = {
  post: Omit<HobbyPostBaseFragment, 'id'>
  edit?: React.ReactNode
}

const HobbyPost = ({ post, edit }: Props) => (
  <StyledWrapper>
    <StyledHeader>
      {post.createdAt && (
        <Text type="secondary">{dayjs(post.createdAt).format('YYYY MMM DD HH:MM')}</Text>
      )}
      {post.createdBy && <StyledEmployeeLink2 employee={post.createdBy} />}
    </StyledHeader>

    <Title level={3}>
      {post.title} {edit}
    </Title>
    <RichText text={post.body} />

    {post.hobbies && (
      <div>
        {post.hobbies.map(hobby => (
          <HobbyTag key={hobby.id} hobby={hobby} />
        ))}
      </div>
    )}
  </StyledWrapper>
)

export default HobbyPost
