import { Avatar, Card, Skeleton, Typography, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { Employee } from '../../types'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

const { Text } = Typography

interface Props {
  loading: boolean
  profile?: Pick<Employee, 'name' | 'position' | 'avatar'>
}

export default function SiderProfile({ loading, profile }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const avatar = <Avatar shape="square" size="large" icon="user" src={profile?.avatar} />
  return (
    <Link to={paths.PROFILE}>
      <Card
        hoverable
        bordered={false}
        style={{ borderRight: 'none' }}
        size={isLarge ? 'default' : 'small'}
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
                    <Text>{profile.position}</Text>
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
