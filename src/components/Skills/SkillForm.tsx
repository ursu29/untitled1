import { Button, Col, Form, Input, Row, Checkbox } from 'antd'
import React from 'react'
import { UpdateSkillInput, CreateSkillInput } from '../../types/graphql'
import SkillSelect from './SkillSelect'
import MarkdownEditor from '../UI/MarkdownEditor'
import { FORM_RULES } from '../../constants'
import { MinusCircleOutlined } from '@ant-design/icons'

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
        <Col span={24}>
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
        <Col span={24}>
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
        <Col span={24}>
          <Form.Item label="Parent skill" name="parent">
            <SkillSelect wide />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Acceptance Criteria" name="acceptanceCriteria">
            <MarkdownEditor id="markdownEditor" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Sources" name="sources" rules={[FORM_RULES.URL]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.List name="additionalSources">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      marginBottom: '12px',
                      paddingRight: index > 0 ? 20 : '',
                    }}
                  >
                    <Form.Item
                      {...field}
                      rules={index > 0 ? [FORM_RULES.URL, FORM_RULES.REQUIRED] : [FORM_RULES.URL]}
                      label={index > 0 ? '' : 'Additional Sources'}
                      key={field.key}
                      style={{ width: '100%', marginBottom: 0 }}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                    {index > 0 && (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        style={{
                          color: 'gray',
                          marginLeft: 10,
                          position: 'absolute',
                          right: 0,
                          top: 10,
                        }}
                      />
                    )}
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <Button type="dashed" onClick={() => add()}>
                    Add additional source
                  </Button>
                  <Form.ErrorList errors={errors} />
                </div>
              </>
            )}
          </Form.List>
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
