import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Col, Radio, Row, Select, Input } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React from 'react'
import { Process } from '../../types'

const CustomerSelect = React.forwardRef((props, ref) => (
  <Select {...props}>
    <Select.Option value="INTERNAL">Internal</Select.Option>
    <Select.Option value="SWISSRE">Swissre</Select.Option>
    <Select.Option value="ALLIANZ">Allianz</Select.Option>
  </Select>
))

export interface Props extends FormComponentProps {
  onSubmit: (process: Process, onDone?: () => void) => void
  loading?: boolean
  data?: Process
}

function ProcessForm({ form, onSubmit, data, loading }: Props) {
  const { getFieldDecorator, getFieldValue } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({ id: data?.id, ...values })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            initialValue: data?.title,
            rules: [
              {
                required: true,
                message: 'please type title',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            valuePropName: 'checked',
            initialValue: data?.type,
            rules: [
              {
                required: true,
                message: 'please choose process type',
              },
            ],
          })(
            <Radio.Group>
              <Radio value="ONBOARDING">Onboarding</Radio>
              <Radio value="OFFBOARDING">Offboarding</Radio>
              <Radio value="ROTATION">Rotation</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="Customer">
          {getFieldDecorator('customer', {
            rules: [
              {
                required: true,
                message: 'please choose customer',
              },
            ],
            initialValue: data?.customer,
          })(<CustomerSelect />)}
        </Form.Item>
        {getFieldValue('type') === 'ROTATION' && (
          <Form.Item label="Next Customer">
            {getFieldDecorator('nextCustomer', {
              rules: [
                {
                  required: true,
                  message: 'please choose customer',
                },
              ],
              initialValue: data?.nextCustomer,
            })(<CustomerSelect />)}
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

export default Form.create<Props>({ name: 'process_form' })(ProcessForm)
