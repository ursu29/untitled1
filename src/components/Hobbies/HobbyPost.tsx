import { Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
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
  post: Pick<HobbyPostBaseFragment, 'title' | 'body' | 'createdAt' | 'createdBy' | 'hobbies'>
  edit?: React.ReactNode
  checkVisibility?: boolean
  loadMore?: () => void
}

const HobbyPost = ({ post, edit, checkVisibility, loadMore }: Props) => {
  const [active, setActive] = useState(checkVisibility)

  useEffect(() => {
    // reset trigger
    setActive(checkVisibility)
  }, [checkVisibility])

  return (
    <VisibilitySensor
      partialVisibility
      active={active}
      onChange={visible => {
        if (visible) {
          // trigger should be called only once
          setActive(false)
          loadMore?.()
        }
      }}
    >
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
    </VisibilitySensor>
  )
}

export default HobbyPost
