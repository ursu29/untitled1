import { Avatar, Card, Skeleton, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { Employee } from '../../types'

const { Text } = Typography

interface Props {
  loading: boolean
  profile?: Pick<Employee, 'name' | 'position' | 'avatar'>
}

export default function SiderProfile({ loading, profile }: Props) {
  return (
    <Link to={paths.PROFILE}>
      <Card hoverable>
        <Skeleton loading={loading} avatar active paragraph={false}>
          {profile && (
            <Card.Meta
              avatar={
                <Avatar shape="square" size="large" icon="user" src={profile.avatar || undefined} />
              }
              description={
                <>
                  <Text strong>{profile.name}</Text>
                  <br />
                  <Text>{profile.position}</Text>
                </>
              }
            />
          )}
        </Skeleton>
      </Card>
    </Link>
  )
}
