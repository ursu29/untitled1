import { Form } from '@ant-design/compatible'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import { Button, Col, Row, Input } from 'antd'
import React from 'react'
import { Guild } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

type ProjectPick = Partial<Guild>

export interface Props extends FormComponentProps {
  onSubmit: (skill: ProjectPick, reset?: () => void) => void
  loading?: boolean
  item?: ProjectPick
  error?: string
}

const GuildForm = ({ form, onSubmit, item, loading }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({ azureDisplayName: item?.azureDisplayName, ...values })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              initialValue: item?.title,
            })(<Input data-cy="title"/>)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Guild Leads">
            {getFieldDecorator('leaders', {
              initialValue: item?.leaders?.map(i => i.id),
            })(<EmployeeSelect wide mode="multiple" keyName="id" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit" data-cy="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create<Props>({ name: 'guild_form' })(GuildForm)
