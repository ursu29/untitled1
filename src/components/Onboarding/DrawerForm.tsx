import { useMutation } from '@apollo/client'
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

  const [createTicket, { loading: createLoading }] = useMutation(createOnboardingTicket, {
    refetchQueries,
    onCompleted: () => {
      handleClose()
      message.success('New ticket has been created')
    },
    onError: message.error,
  })

  const [updateTicket, { loading: updateLoading }] = useMutation(updateOnboardingTicket, {
    refetchQueries,
    onCompleted: () => {
      handleClose()
      message.success('Ticket has been updated')
    },
    onError: message.error,
  })

  const [deleteTicket, { loading: deleteLoading }] = useMutation(deleteOnboardingTicket, {
    refetchQueries,
    onCompleted: () => {
      handleClose()
      message.success('Ticket has been deleted')
    },
    onError: message.error,
  })

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={values => {
        if (!ticket) createTicket({ variables: { input: values } })
        if (ticket) updateTicket({ variables: { input: { id: ticket.id, ...values } } })
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
        name="responsible"
        initialValue={ticket?.responsible?.[0]?.id || null}
      >
        <EmployeeSelect wide />
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="isOptional"
        valuePropName="checked"
        initialValue={ticket?.isOptional || false}
        style={{ marginBottom: 0 }}
      >
        <Checkbox defaultChecked={ticket?.isOptional || false} data-cy="optional">
          Ticket is optional
        </Checkbox>
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="isSwissre"
        valuePropName="checked"
        initialValue={ticket?.isSwissre || false}
      >
        <Checkbox defaultChecked={ticket?.isSwissre || false} data-cy="ticketSwissRe">
          Ticket is SwissRe only
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {ticket && (
            <Popconfirm
              placement="top"
              title={'Are you sure you want to delete this ticket?'}
              onConfirm={() => deleteTicket({ variables: { input: { id: ticket.id } } })}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger style={{ marginRight: '20px' }} loading={deleteLoading}>
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={createLoading || updateLoading}
            data-cy="saveTicket"
          >
            Save
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
