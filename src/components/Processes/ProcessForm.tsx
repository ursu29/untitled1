import { Button, Col, Form, Radio, Row, Select, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { Process } from '../../types'

const CustomerSelect = React.forwardRef((props, ref) => (
  <Select {...props}>
    <Select.Option value="internal">Internal</Select.Option>
    <Select.Option value="swissre">Swissre</Select.Option>
    <Select.Option value="allianz">Allianz</Select.Option>
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
              <Radio value="onboarding">Onboarding</Radio>
              <Radio value="offboarding">Offboaring</Radio>
              <Radio value="rotation">Rotation</Radio>
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
        {getFieldValue('type') === 'rotation' && (
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
