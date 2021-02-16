import { Form, Button, Checkbox, Input, Select } from 'antd'
import React, { useState } from 'react'
import EmployeeSelect from '../Employees/EmployeeSelect'

const { Option } = Select

function ProcessStepForm({
  step,
  onUpdate,
  loading,
}: {
  step: any
  loading: boolean
  onUpdate: (data: any) => void
}) {
  const [form] = Form.useForm()
  const [isTouched, setIsTouched] = useState(false)

  const onSubmit = (data: any) => {
    onUpdate(data)
    setIsTouched(false)
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 24, offset: 0 }}
      initialValues={step}
      onFieldsChange={() => {
        if (!isTouched) setIsTouched(true)
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label={<p style={{ marginBottom: '-5px', color: 'darkgrey' }}>Title</p>}
        style={{ marginBottom: 0, marginTop: '-10px' }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label={<p style={{ marginBottom: '-5px', color: 'darkgrey' }}>Description</p>}
        style={{ marginBottom: 0 }}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="responsibleUsers"
        label={<p style={{ marginBottom: '-5px', color: 'darkgrey' }}>Responsible</p>}
        style={{ marginBottom: 0 }}
      >
        <EmployeeSelect wide mode="multiple" />
      </Form.Item>

      <Form.Item
        name="type"
        label={<p style={{ marginBottom: '-5px', color: 'darkgrey' }}>Step completion</p>}
        style={{ marginBottom: '10px' }}
      >
        <Select defaultValue="APPROVE">
          <Option value="APPROVE">Manual</Option>
          <Option value="NOTIFY" disabled={!step.parentSteps?.length}>
            Auto
          </Option>
          <Option value="INDEPENDENT">Manual independent</Option>
        </Select>
      </Form.Item>

      <Form.Item name="hasComment" valuePropName="checked" style={{ marginBottom: '-10px' }}>
        <Checkbox>Include comment</Checkbox>
      </Form.Item>

      <Form.Item name="sendToTeamlead" valuePropName="checked" style={{ marginBottom: '-10px' }}>
        <Checkbox>Send notification to the project manager</Checkbox>
      </Form.Item>

      <Form.Item name="send24hoursNotification" valuePropName="checked" style={{ marginBottom: 0 }}>
        <Checkbox>Send 24-hours notification reminders</Checkbox>
      </Form.Item>

      {isTouched && (
        <div style={{ marginTop: '20px', textAlign: 'end' }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      )}
    </Form>
  )
}

export default ProcessStepForm
