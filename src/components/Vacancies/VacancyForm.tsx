import React from 'react'
import { Vacancy } from '../../types'
import { Form, Input, Row, Col, Button, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import ProjectSelect from '../Projects/ProjectSelect'
import LocationSelect from '../Locations/LocationSelect'

interface Props extends FormComponentProps {
  vacancy: Partial<Vacancy>
  onSave: (i: any) => void
  onPublish: (i: Partial<Vacancy>) => void
}

function VacancyForm({ vacancy, form, onSave, onPublish }: Props) {
  const { getFieldDecorator } = form
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Position">
            {getFieldDecorator('position', {
              initialValue: vacancy?.position,
              // rules: [{ required: true, message: 'Please add position!' }],
            })(<Input placeholder="Add position" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Reason">
            {getFieldDecorator('reason', {
              initialValue: vacancy?.reason,
            })(<Input placeholder="Provide the reason" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Project">
            {getFieldDecorator('project', {
              initialValue: vacancy?.project?.id,
            })(<ProjectSelect wide />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Locations">
            {getFieldDecorator('locations', {
              initialValue: vacancy?.locations?.map(i => i.id),
            })(<LocationSelect wide mode="multiple" />)}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Responsibilities">
        {getFieldDecorator('responsibilities', {
          initialValue: vacancy?.responsibilities,
        })(<Input.TextArea autoSize placeholder="What will employee do" />)}
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Required skills">
            {getFieldDecorator('requiredSkills', {
              initialValue: vacancy?.requiredSkills,
              // rules: [{ required: true, message: 'What is essential' }],
            })(<Input.TextArea autoSize placeholder="Add position" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Additional skills">
            {getFieldDecorator('additionalSkills', {
              initialValue: vacancy?.additionalSkills,
            })(<Input.TextArea autoSize placeholder="What is nice to have" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" justify="end" align="middle">
        <Button
          onClick={() =>
            onSave({
              ...vacancy,
              ...form.getFieldsValue(),
            })
          }
        >
          Save
        </Button>
        <Divider type="vertical" />
        <Button
          onClick={() =>
            onPublish({
              ...vacancy,
              ...form.getFieldsValue(),
            })
          }
          type="primary"
        >
          Publish
        </Button>
      </Row>
    </Form>
  )
}

export default Form.create<Props>({ name: 'vacancy_form' })(VacancyForm)
