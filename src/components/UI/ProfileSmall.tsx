import { Badge, Card, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { COLLAPSE_WIDTH, MENU_WIDTH } from '../../config'
import paths from '../../paths'
import { Employee } from '../../types'
import Avatar from '../Avatar'
import './styles.css'

const { Text } = Typography

interface Props {
  loading: boolean
  profile?: Pick<Employee, 'name' | 'email' | 'position' | 'status'>
}

export default function SiderProfile({ loading, profile }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Link to={paths.PROFILE}>
      <Card
        data-cy="profile"
        className="profile-small"
        hoverable
        bordered={false}
        style={{
          borderRight: 'none',
          maxWidth: 'fit-content',
          minWidth: isLarge ? `${MENU_WIDTH}px` : '60px',
        }}
        size={isLarge ? 'default' : 'small'}
        bodyStyle={(!isLarge && { padding: 8, paddingTop: 12 }) || undefined}
      >
        <Skeleton loading={loading} avatar active paragraph={false}>
          {profile &&
            (isLarge ? (
              <Card.Meta
                avatar={<Avatar shape="square" size="large" employee={profile} withHat />}
                description={
                  <>
                    <Text strong data-cy="profile_name">
                      {profile.name}
                    </Text>
                    <br />
                    <Badge
                      data-cy="profile_status"
                      color={
                        profile.status === 'Available'
                          ? 'green'
                          : profile.status === 'Unavailable'
                          ? 'gray'
                          : 'red'
                      }
                      text={profile.status}
                    />
                  </>
                }
              />
            ) : (
              <Row justify="center" data-cy="profile_avatar">
                <Avatar shape="square" size="large" employee={profile} withHat />
              </Row>
            ))}
        </Skeleton>
      </Card>
    </Link>
  )
}
