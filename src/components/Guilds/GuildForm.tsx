import { Button, Col, Row, Form, Input } from 'antd'
import React from 'react'
import { Guild } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

type ProjectPick = Partial<Guild>

export interface Props {
  onSubmit: (skill: ProjectPick, reset?: () => void) => void
  loading?: boolean
  item?: ProjectPick
  error?: string
}

const GuildForm = ({ onSubmit, item, loading }: Props) => {
  const handleSubmit = (values: any) => {
    onSubmit({ azureDisplayName: item?.azureDisplayName, ...values })
  }

  console.log(item)
  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ ...item, leaders: item?.leaders?.map(i => i.id) }}
    >
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Title" name="title">
            <Input data-cy="title" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Guild Leads" name="leaders">
            <EmployeeSelect wide mode="multiple" keyName="id" />
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

export default GuildForm
