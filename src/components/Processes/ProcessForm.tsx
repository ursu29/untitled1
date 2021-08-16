import { Button, Col, Radio, Row, Form, Select, Input } from 'antd'
import React from 'react'
import { Process } from '../../types'
import { processList, getProcessName } from '../../utils/getProcessName'

const CustomerSelect = React.forwardRef((props, ref) => (
  <Select {...props}>
    <Select.Option value="INTERNAL">Internal</Select.Option>
    <Select.Option value="SWISSRE">SwissRe</Select.Option>
  </Select>
))

export interface Props {
  onSubmit: (process: Process, onDone?: () => void) => void
  loading?: boolean
  data?: Process
}

function ProcessForm({ onSubmit, data, loading }: Props) {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit({ id: data?.id, ...values })
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'please type title',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please choose process type',
            },
          ]}
        >
          <Radio.Group>
            {processList.map(process => (
              <Radio key={process} value={process}>
                {getProcessName(process)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Customer"
          name="customer"
          rules={[
            {
              required: true,
              message: 'Please choose customer',
            },
          ]}
        >
          <CustomerSelect />
        </Form.Item>
        {form.getFieldValue('type') === 'ROTATION' && (
          <Form.Item
            label="Next Customer"
            name="nextCustomer"
            rules={[
              {
                required: true,
                message: 'Please choose customer',
              },
            ]}
          >
            <CustomerSelect />
          </Form.Item>
        )}
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ProcessForm
