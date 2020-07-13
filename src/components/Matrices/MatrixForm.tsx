import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Col, Input, Row } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React from 'react'

export interface Props extends FormComponentProps {
  onSubmit: (data: any) => void
  loading?: boolean
  data?: any
  error?: string
}

const MatrixForm = ({ form, onSubmit, data, loading }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({
          id: data?.id,
          ...values,
        })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              initialValue: data?.title,
              rules: [
                {
                  required: true,
                  message: 'Please enter title',
                },
              ],
            })(<Input onPressEnter={handleSubmit} placeholder="Please enter title" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              initialValue: data?.description,
              rules: [
                {
                  required: false,
                  message: 'please enter description',
                },
              ],
            })(
              <Input.TextArea
                rows={4}
                onPressEnter={handleSubmit}
                placeholder="please enter description"
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create<Props>({ name: 'matrix_form' })(MatrixForm)
