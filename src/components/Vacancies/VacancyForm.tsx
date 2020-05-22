import React from 'react'
import { Vacancy } from '../../types'
import { Form, Input, Row, Col, Button, Divider, Popconfirm } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import ProjectSelect from '../Projects/ProjectSelect'
import LocationSelect from '../Locations/LocationSelect'
import MarkdownEditor from '../UI/MarkdownEditor'

interface Props extends FormComponentProps {
  vacancy: Partial<Vacancy>
  onClose: (i: any) => void
  onSave: (i: any) => void
  onPublish: (i: Partial<Vacancy>) => void
}

function VacancyForm({ vacancy, form, onClose, onSave, onPublish }: Props) {
  const { getFieldDecorator } = form
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Position">
            {getFieldDecorator('position', {
              initialValue: vacancy?.position,
              rules: [{ required: true, message: 'Please add position!' }],
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
        })(<MarkdownEditor id="responsibilities" />)}
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Required skills">
            {getFieldDecorator('requiredSkills', {
              initialValue: vacancy?.requiredSkills,
            })(<MarkdownEditor id="requiredSkills" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Additional skills">
            {getFieldDecorator('additionalSkills', {
              initialValue: vacancy?.additionalSkills,
            })(<MarkdownEditor id="additionalSkills" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row type="flex" justify="end" align="middle">
        {vacancy.isPublished && (
          <Popconfirm
            title="Are you sure you want to close this vacancy?"
            onConfirm={() => onClose(vacancy)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Close</Button>
          </Popconfirm>
        )}
        <Button
          onClick={() => {
            form.validateFields((error: any, values: any) => {
              if (error) {
                return
              }
              onSave({
                ...vacancy,
                ...values,
              })
            })
          }}
          style={{ marginLeft: '10px' }}
        >
          Save
        </Button>
        {!vacancy.isPublished && (
          <>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                form.validateFields((error: any, values: any) => {
                  if (error) {
                    return
                  }
                  onPublish({
                    ...vacancy,
                    ...values,
                  })
                })
              }}
              type="primary"
            >
              Publish
            </Button>
          </>
        )}
      </Row>
    </Form>
  )
}

export default Form.create<Props>({ name: 'vacancy_form' })(VacancyForm)
