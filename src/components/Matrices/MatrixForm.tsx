import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'

export interface Props {
  onSubmit: (data: any) => void
  loading?: boolean
  data?: any
  error?: string
}

const MatrixForm = ({ onSubmit, data, loading }: Props) => {
  const handleSubmit = (values: any) => {
    onSubmit({
      id: data?.id,
      ...values,
    })
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit} initialValues={data}>
      <Row gutter={16}>
        <Col>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter title',
              },
            ]}
          >
            <Input
              onPressEnter={handleSubmit}
              placeholder="Please enter title"
              data-cy="titleMatrix"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              data-cy="description"
              rows={4}
              onPressEnter={handleSubmit}
              placeholder="please enter description"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit" data-cy="submit">
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default MatrixForm
