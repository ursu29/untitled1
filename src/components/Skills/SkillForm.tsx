import { Button, Col, Form, Input, Row, Checkbox } from 'antd'
import React from 'react'
import { UpdateSkillInput, CreateSkillInput } from '../../types/graphql'
import SkillSelect from './SkillSelect'

type SkillPick = CreateSkillInput | UpdateSkillInput

export interface Props {
  onSubmit: (skill: SkillPick, reset?: () => void) => void
  loading?: boolean
  skill?: SkillPick | null
  error?: string
}

const SkillForm = ({ onSubmit, skill, loading }: Props) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={skill ?? undefined}>
      {skill && 'id' in skill && (
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
      )}
      <Row gutter={16}>
        <Col>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter skill name',
              },
            ]}
          >
            <Input onPressEnter={handleSubmit} placeholder="Please enter skill name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={4}
              onPressEnter={form.submit}
              placeholder="please enter skill description"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Parent skill" name="parent">
            <SkillSelect wide />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item name="isMatrixOnly" valuePropName="checked">
            <Checkbox data-cy="matricesOnly">For matrices only</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit" data-cy="submit">
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SkillForm
