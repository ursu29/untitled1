import { Button, Col, Form, Row } from 'antd'
import React, { useState } from 'react'
import EmployeeSelect from '../Employees/EmployeeSelect'
import { ProjectPick } from '../../queries/getProjectByCode'
import { EmployeesAllocations } from './EmployeesAllocations'

export interface Props {
  onSubmit: (skill: ProjectPick, reset?: () => void) => void
  loading?: boolean
  item?: ProjectPick
  error?: string
}

const ProjectForm = ({ onSubmit, item, loading }: Props) => {
  const [form] = Form.useForm()
  const [employeeProjects, setEmployeeProjects] = useState<{
    [id: string]: { capacity?: number; isExtraCapacity?: boolean }
  }>({})
  const [employeeIDsErrors, setEmployeeIDsErrors] = useState<string[]>([])

  const handleSubmit = (values: any) => {
    onSubmit({
      id: item?.id,
      ...values,
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...item,
        scrumMasters: item?.scrumMasters?.map(i => i.id),
        projectsOccupancy: employeeProjects,
      }}
    >
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Scrum Masters" name="scrumMasters">
            <EmployeeSelect wide mode="multiple" keyName="id" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Allocation:" name="projectsOccupancy">
            <EmployeesAllocations
              projectCode={item?.code || ''}
              form={form}
              errors={employeeIDsErrors}
              onChange={setEmployeeProjects}
              onError={setEmployeeIDsErrors}
            />
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
