import { Button, Typography, Tag, Popconfirm } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as OutlookIcon } from '../../svg/outlook.svg'
import { ReactComponent as TeamsIcon } from '../../svg/teams.svg'
import { OnboardingTicket } from '../../types'
import Avatar from '../Avatar'
import { CheckCircleOutlined } from '@ant-design/icons'

const TicketCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 480px;
  min-height: 256px;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 24px;
  margin: 0 36px 32px 0;
`

export default function Ticket({
  ticket,
  isCompleted,
  onClick,
  isAccessWrite,
  completeTicket,
  requestTicket,
}: { ticket: OnboardingTicket } & {
  isCompleted: boolean
  onClick: any
  isAccessWrite: boolean
  completeTicket: any
  requestTicket: any
}) {
  const { title, description, responsible } = ticket
  const { email, name, position } = responsible?.[0] || { email: null, name: null, position: null }

  return (
    <TicketCard>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div onClick={() => onClick()}>
            <Typography.Title
              level={4}
              disabled={!title}
              style={{ fontSize: '24px', cursor: isAccessWrite ? 'pointer' : 'default' }}
            >
              {title || 'no title'}
            </Typography.Title>
          </div>
          {!isAccessWrite ? (
            isCompleted ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                COMPLETED
              </Tag>
            ) : (ticket.isOptional ? ticket?.isRequestedByMe : true) ? (
              <Tag color="gold">IN PROGRESS</Tag>
            ) : null
          ) : null}
        </div>

        <div>
          <Typography.Text disabled={!description} style={{ fontSize: '14px' }}>
            {description || 'no description'}
          </Typography.Text>
        </div>
      </div>

      <div>
        <div style={{ margin: '20px 0 20px 0' }}>
          {email ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar employee={{ email, name }} size={28} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '13px',
                }}
              >
                <div style={{ fontSize: '14px' }}>{name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(0, 0, 0, 0.25)' }}>{position}</div>
              </div>
            </div>
          ) : (
            <Typography.Text disabled={true}>no responsible</Typography.Text>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <a
              href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ paddingRight: 8 }}
            >
              <Button
                shape="circle"
                disabled={!email}
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <OutlookIcon />
              </Button>
            </a>
            <a
              href={`https://teams.microsoft.com/l/chat/0/0?users=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ paddingRight: 8 }}
            >
              <Button
                shape="circle"
                disabled={!email}
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TeamsIcon />
              </Button>
            </a>
          </div>
          {!isAccessWrite && !isCompleted && (ticket.isOptional ? ticket?.isRequestedByMe : true) && (
            <Popconfirm
              placement="top"
              title={'Are you sure you want to complete this ticket?'}
              onConfirm={completeTicket}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Complete</Button>
            </Popconfirm>
          )}
          {!isAccessWrite && !isCompleted && ticket.isOptional && !ticket?.isRequestedByMe && (
            <Popconfirm
              placement="top"
              title={'Are you sure you want to sign up for this training?'}
              onConfirm={requestTicket}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Request training</Button>
            </Popconfirm>
          )}
        </div>
      </div>
    </TicketCard>
  )
}
