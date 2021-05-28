import { Badge, Card, Row, Skeleton, Typography, notification } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { COLLAPSE_WIDTH, MENU_WIDTH } from '../../config'
import paths from '../../paths'
import { Employee, Notification } from '../../types/graphql'
import Avatar from '../Avatar'
import { BellOutlined } from '@ant-design/icons'
import NotificationsBody from '../../components/UI/NotificationsBody'
import styled from 'styled-components'
import './styles.css'
import {
  useUnsubscribeNotificationMutation,
  GetNotificationsDocument,
} from '../../queries/notifications'
import { useHistory } from 'react-router-dom'

const { Text } = Typography

const RingBell = styled.div`
  padding-right: 2px;
  opacity: 0.9;
  :hover {
    transform: scale(1.1);
    transition: all 0.1s;
    opacity: 1;
  }
`

interface Props {
  loading: boolean
  profile?: Pick<Employee, 'name' | 'email' | 'position' | 'status'> | null
  notifications?: Notification[] | undefined
}

export default function ProfileSmall({ loading, profile, notifications }: Props) {
  const history = useHistory()
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  const [unsubscribe] = useUnsubscribeNotificationMutation({
    refetchQueries: [{ query: GetNotificationsDocument }],
    awaitRefetchQueries: true,
  })

  const openNotifications = (
    args: Partial<Parameters<typeof notification.open>[0]>,
    notifications?: Notification[] | undefined,
  ) => {
    notification.open({
      message: null,
      description: (
        <NotificationsBody
          notificationsData={notifications}
          unsubscribe={unsubscribe}
          onLink={(link: string) => {
            history.push('/' + link)
          }}
        />
      ),
      placement: 'topLeft',
      key: 'main-notification',
      ...args,
    })
  }

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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text strong data-cy="profile_name">
                      {profile.name}
                    </Text>
                    {isLarge && (
                      <RingBell
                        id="notifications-ring-bell"
                        onClick={e => {
                          const marginLeft = document
                            .querySelector('#notifications-ring-bell')
                            ?.getBoundingClientRect().right
                          e.preventDefault()
                          openNotifications(
                            {
                              style: {
                                marginLeft: (marginLeft || 0) + 24,
                                backgroundColor: '#E7F7FF',
                              },
                              duration: !notifications?.length ? 1 : null,
                            },
                            notifications,
                          )
                        }}
                      >
                        {!!notifications?.length ? (
                          <Badge color="red" size="small" offset={[-2, 5]}>
                            <BellOutlined style={{ fontSize: '20px', color: '#1890FF' }} />
                          </Badge>
                        ) : (
                          <BellOutlined style={{ fontSize: '20px', color: 'gray' }} />
                        )}
                      </RingBell>
                    )}
                  </div>
                }
              />
            ) : (
              <Row justify="center" data-cy="profileAvatar">
                <Avatar shape="square" size="large" employee={profile} withHat />
              </Row>
            ))}
        </Skeleton>
      </Card>
    </Link>
  )
}
