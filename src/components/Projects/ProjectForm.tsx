import { Form } from '@ant-design/compatible'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import { Button, Col, Row } from 'antd'
import React from 'react'
import EmployeeSelect from '../Employees/EmployeeSelect'
import { ProjectPick } from '../../queries/getProjectByCode'

export interface Props extends FormComponentProps {
  onSubmit: (skill: ProjectPick, reset?: () => void) => void
  loading?: boolean
  item?: ProjectPick
  error?: string
}

const ProjectForm = ({ form, onSubmit, item, loading }: Props) => {
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
      {/* <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              initialValue: item?.name,
              rules: [
                {
                  required: true,
                  message: 'Please enter skill name',
                },
              ],
            })(<Input onPressEnter={handleSubmit} placeholder="Please enter skill name" />)}
          </Form.Item>
        </Col>
      </Row> */}
      {/* <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              initialValue: item?.description,
              rules: [
                {
                  required: false,
                  message: 'please enter skill description',
                },
              ],
            })(
              <Input.TextArea
                rows={4}
                onPressEnter={handleSubmit}
                placeholder="please enter skill description"
              />,
            )}
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item label="Scrum Masters">
            {getFieldDecorator('scrumMasters', {
              initialValue: item?.scrumMasters?.map(i => i.id),
            })(<EmployeeSelect wide mode="multiple" keyName="id" />)}
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

export default Form.create<Props>({ name: 'project_form' })(ProjectForm)
