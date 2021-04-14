import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { Project } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

type ProjectPick = Partial<Project>

export interface Props {
  onSubmit: (skill: ProjectPick, reset?: () => void) => void
  loading?: boolean
  item?: ProjectPick
  error?: string
}

const ProjectForm = ({ onSubmit, item, loading }: Props) => {
  const handleSubmit = (values: any) => {
    onSubmit({
      id: item?.id,
      ...values,
    })
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ ...item, scrumMasters: item?.scrumMasters?.map(i => i.id) }}
    >
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Scrum Masters" name="scrumMasters">
            <EmployeeSelect wide mode="multiple" keyName="id" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ProjectForm
