import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Input, Popconfirm, Checkbox } from 'antd'
import React from 'react'
import message from '../../message'
import {
  createOnboardingTicket,
  deleteOnboardingTicket,
  getOnboardingTickets,
  updateOnboardingTicket,
  getEmployeesOnboardingTickets,
} from '../../queries/onboardingTickets'
import { OnboardingTicket } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
}
const tailLayout = {
  wrapperCol: { offset: 7, span: 17 },
}

export default function DrawerForm({
  ticket,
  handleClose,
  withResponsible,
}: {
  ticket: OnboardingTicket | null
  handleClose: any
  withResponsible: string | null
}) {
  const refetchQueries = [
    { query: getOnboardingTickets },
    {
      query: getEmployeesOnboardingTickets,
      variables: withResponsible
        ? {
            withResponsible,
          }
        : {},
    },
  ]

  const [createTicket] = useMutation(createOnboardingTicket, {
    refetchQueries,
    onCompleted: () => message.success('New ticket has been created'),
    onError: message.error,
  })

  const [updateTicket] = useMutation(updateOnboardingTicket, {
    refetchQueries,
    onCompleted: () => message.success('Ticket has been updated'),
    onError: message.error,
  })

  const [deleteTicket] = useMutation(deleteOnboardingTicket, {
    refetchQueries,
    onCompleted: () => message.success('Ticket has been deleted'),
    onError: message.error,
  })

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={values => {
        if (!ticket) createTicket({ variables: { input: values } })
        if (ticket) updateTicket({ variables: { input: { id: ticket.id, ...values } } })
        handleClose()
      }}
    >
      <Form.Item label="Title" name="title" initialValue={ticket?.title || ''}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description" initialValue={ticket?.description || ''}>
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Responsible"
        name="responsibleMail"
        initialValue={ticket?.responsible?.[0]?.email || ''}
      >
        <EmployeeSelect wide keyName="email" />
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="isOptional"
        valuePropName="checked"
        initialValue={ticket?.isOptional || false}
        style={{ marginBottom: 0 }}
      >
        <Checkbox defaultChecked={ticket?.isOptional || false}>Ticket is optional</Checkbox>
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="isSwissRe"
        valuePropName="checked"
        initialValue={ticket?.isSwissRe || false}
      >
        <Checkbox defaultChecked={ticket?.isSwissRe || false}>Ticket is SwissRe only</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {ticket && (
            <Popconfirm
              placement="top"
              title={'Are you sure you want to delete this ticket?'}
              onConfirm={() => {
                deleteTicket({ variables: { input: { id: ticket.id } } })
                handleClose()
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger style={{ marginRight: '20px' }}>
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
