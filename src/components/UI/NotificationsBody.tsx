import React, { useState } from 'react'
import { notification, Tooltip } from 'antd'
import { Notification } from '../../types/graphql'
import { CSSProperties } from 'styled-components'
import { SmileOutlined, ClearOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  color: #108ee9;
`

const SubTitle = styled.div`
  font-style: italic;
  opacity: 0.6;
`

const LinkText = styled.p`
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const Section = styled.div`
  padding-left: 36px;
  padding-bottom: 8px;
`

const iconStyle: CSSProperties = {
  color: '#108ee9',
  fontSize: '28px',
  marginRight: '8px',
}

export default function NotificationsBody({
  notificationsData,
  unsubscribe,
  onLink,
}: {
  notificationsData: Notification[] | undefined
  unsubscribe: any
  onLink: any
}) {
  const [notifications, setNotifications] = useState(notificationsData)

  const birthdayToday = notifications?.filter(e => e.type === 'BIRTHDAY_TODAY') || []
  const birthdayTomorrow = notifications?.filter(e => e.type === 'BIRTHDAY_TOMORROW') || []
  const birthdayAftertomorrow =
    notifications?.filter(e => e.type === 'BIRTHDAY_AFTERTOMORROW') || []
  const isBirthdays =
    !!birthdayToday?.length || !!birthdayTomorrow?.length || !!birthdayAftertomorrow?.length

  const birthdaySection = (title: string, notifications: Notification[]) => (
    <Section>
      <SubTitle>{title}</SubTitle>
      {notifications.map(e => (
        <div key={e.id} style={{ width: 'fit-content' }}>
          <LinkText onClick={() => onLink(e.link)}>{e.title}</LinkText>
        </div>
      ))}
    </Section>
  )

  return (
    <div
      style={{
        userSelect: 'none',
      }}
    >
      {!notifications?.length && <div>nothing here</div>}
      {isBirthdays && (
        <div>
          <MainTitle>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SmileOutlined style={iconStyle} />
              Birthdays!
            </div>
            <Tooltip placement="top" title="Clear">
              <ClearOutlined
                style={{ marginRight: '48px', fontSize: '14px', opacity: 0.7, cursor: 'pointer' }}
                onClick={() => {
                  const removingIds = [
                    ...birthdayToday,
                    ...birthdayTomorrow,
                    ...birthdayAftertomorrow,
                  ].map(e => e.id)
                  setNotifications(notifications?.filter(e => !removingIds.includes(e.id)))
                  unsubscribe({
                    variables: {
                      ids: removingIds,
                    },
                  })
                  setTimeout(() => notification.close('main-notification'), 1000)
                }}
              />
            </Tooltip>
          </MainTitle>
          {!!birthdayToday?.length && birthdaySection('Today', birthdayToday)}
          {!!birthdayTomorrow?.length && birthdaySection('Tomorrow', birthdayTomorrow)}
          {!!birthdayAftertomorrow?.length &&
            birthdaySection('Day after tomorrow', birthdayAftertomorrow)}
        </div>
      )}
    </div>
  )
}
