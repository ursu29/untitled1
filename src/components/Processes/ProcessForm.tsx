import { Button, Checkbox, Col, Form, Radio, Row, Select, Typography } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { Process } from '../../types'

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
        <Form.Item>
          {getFieldDecorator('isRotation', {
            valuePropName: 'checked',
            initialValue: data?.isRotation,
          })(<Checkbox>Rotation</Checkbox>)}
          {getFieldValue('isRotation') && (
            <div style={{ marginTop: 16 }}>
              <Typography.Text type="secondary">
                Rotation consists of 2 procesess of onboarding and offboarding individually. First
                select the process and then the client
              </Typography.Text>
            </div>
          )}
        </Form.Item>
        <Form.Item>
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
          })(
            <Select>
              <Select.Option value="internal">Internal</Select.Option>
              <Select.Option value="swissre">Swissre</Select.Option>
              <Select.Option value="allianz">Allianz</Select.Option>
            </Select>,
          )}
        </Form.Item>
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
