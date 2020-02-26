import { Avatar, Card, Skeleton, Typography, Row, Badge } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { Employee } from '../../types'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

const { Text } = Typography

interface Props {
  loading: boolean
  profile?: Pick<Employee, 'name' | 'position' | 'avatar' | 'status'>
}

export default function SiderProfile({ loading, profile }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const avatar = (
    <Avatar shape="square" size="large" icon="user" src={profile?.avatar} alt={profile?.name} />
  )
  return (
    <Link to={paths.PROFILE}>
      <Card
        hoverable
        bordered={false}
        style={{ borderRight: 'none' }}
        size={isLarge ? 'default' : 'small'}
        bodyStyle={(!isLarge && { padding: 8, paddingTop: 12 }) || undefined}
      >
        <Skeleton loading={loading} avatar active paragraph={false}>
          {profile &&
            (isLarge ? (
              <Card.Meta
                avatar={avatar}
                description={
                  <>
                    <Text strong>{profile.name}</Text>
                    <br />
                    <Badge
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
              <Row type="flex" justify="center">
                {avatar}
              </Row>
            ))}
        </Skeleton>
      </Card>
    </Link>
  )
}
