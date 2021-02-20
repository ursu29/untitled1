import { Form } from '@ant-design/compatible'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import { Button, Col, Row } from 'antd'
import React from 'react'
import { EmployeeDetails } from '../../fragments'
import { Employee } from '../../types'
import EmployeeSelect from '../Employees/EmployeeSelect'

type EmployeePick = {
  id: Employee['id']
  agileManager: EmployeeDetails | null
}

export interface Props extends FormComponentProps {
  onSubmit: (employee: EmployeePick, reset?: () => void) => void
  loading?: boolean
  item?: EmployeePick
  error?: string
}

const EmployeeForm = ({ form, onSubmit, item, loading }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({
          id: item?.id,
          ...values,
        })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Agile Manager">
            {getFieldDecorator('agileManager', {
              initialValue: item?.agileManager?.id,
            })(<EmployeeSelect wide />)}
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

export default Form.create<Props>({ name: 'Employee_form' })(EmployeeForm)
