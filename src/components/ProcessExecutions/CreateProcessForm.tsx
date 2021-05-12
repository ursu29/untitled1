import { Button, Col, Row, Form, Select } from 'antd'
import React, { useState } from 'react'
import { ProcessExecution, ProcessType } from '../../types'
import LocationSelect from '../Locations/LocationSelect'
import ProcessSelect from '../Processes/ProcessSelect'
import ProjectSelect from '../Projects/ProjectSelect'

const typesWithProjects: ProcessType[] = ['ONBOARDING', 'OFFBOARDING']

export interface Props {
  onSubmit: (value: any, onDone?: () => void) => void
  loading?: boolean
  value?: Partial<ProcessExecution>
}

const CreateProcessForm = ({ onSubmit, value, loading }: Props) => {
  const [form] = Form.useForm()
  const [type, setType] = useState<ProcessType | null>(null)

  const handleSubmit = (values: any) => {
    onSubmit({
      id: value?.id,
      ...values,
    })
  }

  const showProjectSelector = type && typesWithProjects.includes(type)

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ ...value, project: value?.project?.id }}
    >
      <Form.Item label="Process type" name="process" rules={[{ required: true }]}>
        <ProcessSelect
          onChange={(value, options) => {
            //@ts-ignore
            setType(options.props.title)
          }}
          style={{ width: '100%' }}
        />
      </Form.Item>
      {type && <div style={{ marginBottom: 16 }}>You're about to start {type} process</div>}
      {type === 'ROTATION' && (
        <>
          <Form.Item label="From" name="projectFrom" rules={[{ required: true }]}>
            <ProjectSelect wide />
          </Form.Item>
          <Form.Item label="To" name="projectTo" rules={[{ required: true }]}>
            <ProjectSelect wide />
          </Form.Item>
        </>
      )}
      {type && (
        <Form.Item label="Locations" name="locations" rules={[{ required: true }]}>
          <LocationSelect mode="multiple" wide />
        </Form.Item>
      )}
      {showProjectSelector && (
        <Form.Item label="Project" name="project" rules={[{ required: true }]}>
          <ProjectSelect wide />
        </Form.Item>
      )}
      {type && (
        <Form.Item label="Priority" name="prio" rules={[{ required: true }]}>
          <Select>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Select.Option key={i} value={i + 1}>
                  {i + 1}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      )}
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit" data-cy="create">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateProcessForm
