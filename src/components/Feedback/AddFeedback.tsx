import React, { useState } from 'react'
import { Collapse, Form, Select, Input, Button, Checkbox } from 'antd'
import ProjectSelect from '../Projects/ProjectSelect'
import { useAddFeedbackMutation } from '../../queries/feedback'
import { Feedback_About as FeedbackAbout } from '../../types/graphql'
import message from '../../message'
import { aboutList } from './about'

const { Panel } = Collapse
const { Option } = Select

export default function AddFeedback() {
  const [form] = Form.useForm()

  const [addNewFeedback, { loading }] = useAddFeedbackMutation({
    onCompleted: () => {
      message.success('Your feedback has been sent')
      form.resetFields()
    },
    refetchQueries: ['getFeedbacks'],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const [about, setAbout] = useState<string | null>(null)

  const onFinish = (values: any) => {
    addNewFeedback({
      variables: { input: values },
    })
  }

  const onAboutChange = (value: string) => setAbout(value)

  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={() => {}}
      style={{ marginBottom: '50px' }}
      expandIconPosition="right"
    >
      <Panel header="Add new" style={{ fontSize: '16px' }} key="1">
        <Form
          labelCol={{ span: 4 }}
          name="addFeedbackForm"
          form={form}
          initialValues={{ isPrivate: false }}
          onFinish={onFinish}
          style={{ padding: '10px 20px 0 20px' }}
        >
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: ' Please select the object of your feedback' }]}
          >
            <Select
              data-cy="about"
              placeholder="Select the object of your feedback"
              style={{ width: '100%' }}
              onChange={onAboutChange}
            >
              {aboutList.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {about === FeedbackAbout.Team && (
            <Form.Item
              data-cy="project"
              label="Project"
              name="project"
              rules={[{ required: true, message: 'Please select the project' }]}
            >
              <ProjectSelect
                onChange={project => form.setFieldsValue({ project })}
                wide
                placeholder="Select the project"
              />
            </Form.Item>
          )}
          <Form.Item
            data-cy="message"
            label="Text"
            name="text"
            rules={[
              {
                required: true,
                min: 15,
                max: 500,
                message: 'Text must be greater than 15 and less than 500 characters',
              },
            ]}
          >
            <Input.TextArea
              data-cy="feedback"
              autoSize={{ minRows: 4, maxRows: 20 }}
              placeholder="What do you want to say?"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="isPrivate" valuePropName="checked" wrapperCol={{ offset: 4 }}>
            <Checkbox data-cy="onlyManager">Show only for managers</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit" loading={loading} data-cy="post">
              Post
            </Button>
            <div style={{ position: 'absolute', color: '#b3b1b1', marginTop: '5px' }}>
              Your feedback will be completely anonymous.
            </div>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  )
}
