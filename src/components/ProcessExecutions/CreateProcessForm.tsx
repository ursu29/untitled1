import { Button, Col, Form, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { ProcessExecution } from '../../types'
import LocationSelect from '../Locations/LocationSelect'
import ProcessSelect from '../Processes/ProcessSelect'
import ProjectSelect from '../Projects/ProjectSelect'

export interface Props extends FormComponentProps {
  onSubmit: (value: any, onDone?: () => void) => void
  loading?: boolean
  value?: Partial<ProcessExecution>
}

const CreateProcessForm = ({ form, onSubmit, value, loading }: Props) => {
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

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="Process type">
        {getFieldDecorator('process', {
          initialValue: value?.process?.id,
        })(<ProcessSelect style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item label="Locations">
        {getFieldDecorator('locations', {
          initialValue: value?.locations?.map((i) => i.id),
        })(<LocationSelect mode="multiple" wide />)}
      </Form.Item>
      <Form.Item label="Project">
        {getFieldDecorator('project', {
          initialValue: value?.project?.id,
        })(<ProjectSelect wide />)}
      </Form.Item>
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
