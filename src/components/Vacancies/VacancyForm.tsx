// import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Col, Divider, Form, Input, Popconfirm, Row } from 'antd'
import React from 'react'
import { VacancyPick } from '../../queries/getVacancies'
import LocationSelect from '../Locations/LocationSelect'
import ProjectSelect from '../Projects/ProjectSelect'
import MarkdownEditor from '../UI/MarkdownEditor'

interface Props {
  vacancy: VacancyPick
  onClose: (i: any) => void
  onSave: (i: any) => void
  onPublish: (i: VacancyPick) => void
}

export default function VacancyForm({ vacancy, onClose, onSave, onPublish }: Props) {
  const [form] = Form.useForm()
  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Position"
            name="position"
            initialValue={vacancy.position}
            rules={[{ required: true, message: 'Position is required!' }]}
          >
            <Input placeholder="Add position" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Reason" name="reason" initialValue={vacancy.reason}>
            <Input placeholder="Provide the reason" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Project" name="project" initialValue={vacancy.project?.id}>
            <ProjectSelect wide />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Locations"
            name="locations"
            initialValue={vacancy.locations?.map(i => i.id)}
          >
            <LocationSelect wide mode="multiple" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Responsibilities"
        name="responsibilities"
        initialValue={vacancy.responsibilities}
      >
        <MarkdownEditor id="responsibilities" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Required skills"
            name="requiredSkills"
            initialValue={vacancy.requiredSkills}
          >
            <MarkdownEditor id="requiredSkills" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Additional skills"
            name="additionalSkills"
            initialValue={vacancy.additionalSkills}
          >
            <MarkdownEditor id="additionalSkills" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="English level" name="englishLevel" initialValue={vacancy.englishLevel}>
            <Input placeholder="Provide the level" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Employee experience"
            name="employeeExperience"
            initialValue={vacancy.employeeExperience}
          >
            <Input placeholder="Provide the experience" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Project stack" name="stack" initialValue={vacancy.stack}>
            <Input.TextArea rows={3} placeholder="Provide the stack" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" align="middle">
        {vacancy.isPublished && (
          <Popconfirm
            title="Are you sure you want to close this vacancy?"
            onConfirm={() => onClose(vacancy)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Terminate vacancy</Button>
          </Popconfirm>
        )}
        <Button
          onClick={() => {
            form.validateFields().then(values => {
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
                form.validateFields().then(values => {
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
