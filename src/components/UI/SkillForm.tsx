import { Button, Col, Form, Input, Row, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { Skill } from '../../types'

type SkillPick = Partial<Skill> & {
  parent?: string | null
}

export interface Props extends FormComponentProps {
  onSubmit: (skill: SkillPick, reset?: () => void) => void
  loading?: boolean
  skill?: SkillPick
  error?: string
  parentSkillSelect: any
}

const SkillForm = ({ form, onSubmit, skill, loading, parentSkillSelect }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({
          id: skill?.id,
          ...values,
          // parent: values.parent && values.parent['id'],
        })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
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
