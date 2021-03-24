import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Col, Input, Row, Checkbox } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React from 'react'
import { UpdateSkillInput, CreateSkillInput } from '../../types/graphql'

type SkillPick = CreateSkillInput | UpdateSkillInput

export interface Props extends FormComponentProps {
  onSubmit: (skill: SkillPick, reset?: () => void) => void
  loading?: boolean
  skill?: SkillPick | null
  error?: string
  parentSkillSelect: any
}

const SkillForm = ({ form, onSubmit, skill, loading, parentSkillSelect }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      {skill && 'id' in skill && (
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('id', {
            initialValue: skill.id,
          })(<Input type="hidden" />)}
        </Form.Item>
      )}
      <Row gutter={16}>
        <Col>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              initialValue: skill?.name,
              rules: [
                {
                  required: true,
                  message: 'Please enter skill name',
                },
              ],
            })(<Input onPressEnter={handleSubmit} placeholder="Please enter skill name" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              initialValue: skill?.description,
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
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Parent skill">
            {getFieldDecorator('parent', {
              initialValue: skill?.parent,
              rules: [
                {
                  required: false,
                  message: 'please enter parent skill',
                },
              ],
            })(parentSkillSelect)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item>
            {getFieldDecorator('isMatrixOnly', {
              valuePropName: 'checked',
              initialValue: skill && skill.isMatrixOnly,
              rules: [
                {
                  required: false,
                  message: 'please enter parent skill',
                },
              ],
            })(<Checkbox>For matrices only</Checkbox>)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create<Props>({ name: 'skill_form' })(SkillForm)
