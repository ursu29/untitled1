import { Button, Col, Form, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { Skill } from '../../types'

type SkillPick = Partial<Skill> & {
  parent?: string | null
}

export interface Props extends FormComponentProps {
  onSubmit: (skill: SkillPick) => void
  loading?: boolean
  skill?: SkillPick
  error?: string
}

const SkillForm = ({ form, onSubmit, skill, loading }: Props) => {
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
            })(
              <Input autoFocus onPressEnter={handleSubmit} placeholder="Please enter skill name" />,
            )}
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
      {/* <Row gutter={16}>
        <Col>
          <Form.Item label="Parent skill">
            {getFieldDecorator('parent', {
              initialValue: skill && skill.parent,
              rules: [
                {
                  required: false,
                  message: 'please enter parent skill',
                },
              ],
            })(<SkillSelect allowAddNew={false} />)}
          </Form.Item>
        </Col>
      </Row> */}
      {/* <DashQuery query={skillsAdminAccess()}>
        {({ access }: { access: Access }) => {
          if (!access.read) return null
          return (
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
                  })(<Checkbox disabled={!access.write}>For matrices only</Checkbox>)}
                </Form.Item>
              </Col>
            </Row>
          )
        }}
      </DashQuery> */}
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
