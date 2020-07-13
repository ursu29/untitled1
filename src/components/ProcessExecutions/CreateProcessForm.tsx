import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Col, Row } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React, { useState } from 'react'
import { ProcessExecution, ProcessType } from '../../types'
import LocationSelect from '../Locations/LocationSelect'
import ProcessSelect from '../Processes/ProcessSelect'
import ProjectSelect from '../Projects/ProjectSelect'

export interface Props extends FormComponentProps {
  onSubmit: (value: any, onDone?: () => void) => void
  loading?: boolean
  value?: Partial<ProcessExecution>
}

const CreateProcessForm = ({ form, onSubmit, value, loading }: Props) => {
  const [type, setType] = useState<ProcessType | null>(null)
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({
          id: value?.id,
          ...values,
        })
      }
    })
  }

  const showProjectSelector = type && ['onboarding', 'offboarding'].includes(type)

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="Process type">
        {getFieldDecorator('process', {
          initialValue: value?.process?.id,
        })(
          <ProcessSelect
            onChange={(value, options) => {
              //@ts-ignore
              setType(options.props.title)
            }}
            style={{ width: '100%' }}
          />,
        )}
      </Form.Item>
      {type && <div style={{ marginBottom: 16 }}>You're about to start {type} process</div>}
      {type && (
        <Form.Item label="Locations">
          {getFieldDecorator('locations', {
            initialValue: value?.locations?.map(i => i.id),
            rules: [{ required: true }],
          })(<LocationSelect mode="multiple" wide />)}
        </Form.Item>
      )}
      {showProjectSelector && (
        <Form.Item label="Project">
          {getFieldDecorator('project', {
            initialValue: value?.project?.id,
            rules: [{ required: true }],
          })(<ProjectSelect wide />)}
        </Form.Item>
      )}
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

export default Form.create<Props>({ name: 'active_process_form' })(CreateProcessForm)
