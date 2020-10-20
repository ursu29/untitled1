import React, { useState } from 'react'
import { Collapse, Form, Select, Input, Button, Checkbox } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import ProjectSelect from '../Projects/ProjectSelect'
import { addFeedback } from '../../queries/feedback'
import message from '../../message'

export default function AddFeedback() {
  const { Panel } = Collapse
  const { Option } = Select
  const [form] = Form.useForm()
  const header = React.createElement('div', { style: { fontSize: '16px' } }, 'Add new')

  const [addNewFeedback] = useMutation(addFeedback, {
    onCompleted: () => {
      message.success('Your feedback has been sent')
      form.resetFields()
    },
    refetchQueries: ['getFeedbacks'],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const [about, setAbout] = useState('')

  const onFinish = ({ isManagersOnly, ...values }: any) => {
    addNewFeedback({
      variables: { input: { ...values, isPublic: !isManagersOnly } },
    })
  }

  const onAboutChange = (value: any) => setAbout(value)

  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={() => {}}
      style={{ maxWidth: '570px', marginBottom: '50px' }}
      expandIconPosition="right"
    >
      <Panel header={header} key="1">
        <Form
          labelCol={{ span: 4 }}
          name="addFeedbackForm"
          form={form}
          initialValues={{ remember: true, isManagersOnly: false }}
          onFinish={onFinish}
          style={{ padding: '10px 20px 0 20px' }}
        >
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: ' Please select the object of your feedback' }]}
          >
            <Select
              placeholder="Select the object of your feedback"
              style={{ width: '100%' }}
              onChange={onAboutChange}
            >
              <Option value="Sidenis">Sidenis</Option>
              <Option value="Team">Team</Option>
              <Option value="Events">Events</Option>
              <Option value="Portal">Portal</Option>
            </Select>
          </Form.Item>
          {about === 'Team' && (
            <Form.Item
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
              autoSize={{ minRows: 4, maxRows: 20 }}
              placeholder="What do you want to say?"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="isManagersOnly" valuePropName="checked" wrapperCol={{ offset: 4 }}>
            <Checkbox>Show only for managers</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit">
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
