import { Button, Form, Input } from 'antd'
import React from 'react'
import { Hobby } from '../../types/graphql'

type FormFields = Pick<Hobby, 'name' | 'description'>

type Props = {
  hobby?: FormFields | null
  onSubmit: (hobby: FormFields, onDone?: () => void) => void
  loading?: boolean
}

export const HobbyForm: React.FC<Props> = ({ onSubmit, loading, hobby }) => {
  const [form] = Form.useForm<FormFields>()

  return (
    <Form
      form={form}
      name="hobby"
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ ...hobby }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'This is required field!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea autoSize={{ minRows: 4 }} />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {hobby ? 'Save' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}
