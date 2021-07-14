import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Modal, Button, Space, Alert, Typography, Popconfirm, Input, Form } from 'antd'
import dayjs from 'dayjs'
import Technologies from '../UI/Technologies'
import { getEvent, attendEvent, attendEventEveryone, cancelEvent } from '../../queries/events'
import { CalendarEvent } from '../../types'
import ExternalLinkIcon from '../../svg/external-link.svg'
import Avatar from '../Avatar'
import message from '../../message'
import EmployeeCard from '../Employees/EmployeeCard'
import { useEmployee } from '../../utils/withEmployee'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { makeExternalUrl } from '../../utils/links'
import { useMutation } from '@apollo/client'

export default function ModalEventSignUp({
  visible,
  eventId,
  handleClose,
  refetchQueries,
}: {
  visible: boolean
  eventId: string
  handleClose: any
  refetchQueries: { query: any; variables: any }[]
}) {
  const [isAllAttendeesShown, setIsAllAttendeesShown] = useState(false)
  const [isCancelModalShown, setIsCancelModalShown] = useState(false)
  const [form] = Form.useForm()

  // Get full event by ID
  const { data, loading } = useQuery<{ event: CalendarEvent }>(getEvent, {
    variables: { id: eventId },
    fetchPolicy: 'network-only',
  })

  const [attend, { loading: attendLoading }] = useMutation(attendEvent, {
    onCompleted: () => message.success('You have successfully signed up to the event'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getEvent, variables: { id: eventId } }],
    onError: message.error,
  })

  const [attendEveryone, { loading: attendEveryoneLoading }] = useMutation(attendEventEveryone, {
    onCompleted: () => message.success('You have successfully invited everyone to the event'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getEvent, variables: { id: eventId } }],
    onError: message.error,
  })

  const [cancel] = useMutation(cancelEvent, {
    onCompleted: () => message.success('You have cancelled the event'),
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
  })

  const event = data?.event

  const user = useEmployee()

  if (!event) {
    if (!loading) message.error('Event was not found')
    return null
  }

  const acceptedEmployees = event.attendees
    .filter(e => ['tentativelyaccepted', 'accepted'].includes(e.status.toLowerCase()))
    .map(e => e.employee)

  const myStatus = event.attendees.find(e => e.employee.id === user.employee.id)?.status

  return (
    <Modal
      centered
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      width={545}
      title={<div>{event.title}</div>}
      visible={visible}
      onCancel={() => handleClose()}
      destroyOnClose={true}
      footer={null}
    >
      {myStatus &&
        (myStatus === 'accepted' ? (
          <Alert message="Accepted" type="success" showIcon style={{ marginBottom: '8px' }} />
        ) : myStatus === 'tentativelyAccepted' ? (
          <Alert
            message="Tentative accepted"
            type="info"
            showIcon
            icon={<QuestionCircleOutlined style={{ color: '#1890ff' }} />}
            style={{ marginBottom: '8px' }}
          />
        ) : myStatus === 'none' || myStatus === 'notResponded' ? (
          <Alert message="Not responded" type="warning" showIcon style={{ marginBottom: '8px' }} />
        ) : myStatus === 'declined' ? (
          <Alert message="Declined" type="error" showIcon style={{ marginBottom: '8px' }} />
        ) : null)}
      <p style={{ fontWeight: 500 }}>
        {event.isExternal ? 'External' : 'Internal'} {event.isOnline ? 'online' : 'offline'} event
        <br />
        {dayjs(event.start).format('MMMM D, HH:mm')} - {dayjs(event.end).format('MMMM D, HH:mm')}
        <br />
        {!!event.city && event.city + ', '}
        {!!event.location && event.location}
      </p>
      <Space direction="vertical">
        {event.description || (
          <Typography.Text style={{ color: 'gray', fontStyle: 'italic' }}>
            (the event has no description)
          </Typography.Text>
        )}
        {!!event.skills?.length && (
          <Technologies isTitleShown={false} technologies={event.skills} amount={5} />
        )}
        {event.link && (
          <a
            href={makeExternalUrl(event.link)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', width: 'fit-content' }}
          >
            To the event page
            <img src={ExternalLinkIcon} style={{ width: '16px', marginLeft: '8px' }} alt="link" />
          </a>
        )}
        <div>
          Attendees:{' '}
          <Typography.Text style={{ fontWeight: 'bold' }} data-cy="count">
            {acceptedEmployees.length}
          </Typography.Text>
          {!!acceptedEmployees.length && !isAllAttendeesShown && (
            <div style={{ display: 'flex', marginTop: '4px', alignItems: 'center' }}>
              {acceptedEmployees.slice(0, 7).map(user => (
                <div key={user.id} style={{ margin: '3px' }} data-cy="user">
                  <Avatar employee={user} size="large" showTooltip />
                </div>
              ))}
              {acceptedEmployees.length > 7 && (
                <Button type="link" onClick={() => setIsAllAttendeesShown(!isAllAttendeesShown)}>
                  (🠗 show more)
                </Button>
              )}
            </div>
          )}
          {!!acceptedEmployees.length && isAllAttendeesShown && (
            <div>
              <Button
                type="link"
                onClick={() => setIsAllAttendeesShown(!isAllAttendeesShown)}
                style={{ marginLeft: '70%', zIndex: 999 }}
              >
                (🠕 show less)
              </Button>
              <div style={{ marginTop: '-20px' }}>
                {acceptedEmployees.map(user => (
                  <EmployeeCard
                    email={user.email}
                    employee={user}
                    key={user?.id}
                    cardProps={{ bordered: false, bodyStyle: { padding: '5px' } }}
                    noLink={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button
          data-cy="signUp"
          type="primary"
          onClick={() => attend({ variables: { id: eventId } })}
          disabled={!!myStatus}
          loading={attendLoading}
        >
          Sign Up
        </Button>
        {event.createdBy.id === user.employee.id && (
          <div>
            <Popconfirm
              placement="top"
              title={'Are you sure you want to invite everyone to this event?'}
              onConfirm={() => attendEveryone({ variables: { id: eventId } })}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                style={{ marginRight: '16px' }}
                loading={attendEveryoneLoading}
                disabled={event.isAttendAll}
              >
                Invite everyone
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="top"
              title={'Are you sure you want to cancel this event?'}
              onConfirm={() => setIsCancelModalShown(true)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger data-cy="delete">
                Cancel it
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
      <Modal
        centered
        title="Event cancellation"
        visible={isCancelModalShown}
        onCancel={() => {
          setIsCancelModalShown(false)
          form.resetFields()
        }}
        onOk={() => {
          cancel({
            variables: {
              input: {
                id: eventId,
                comment: form.getFieldValue('cancellationComment'),
              },
            },
          })
          setIsCancelModalShown(false)
          form.resetFields()
          handleClose()
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Comment about the cancellation sent to all the attendees"
            name="cancellationComment"
          >
            <Input.TextArea maxLength={300} />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  )
}
