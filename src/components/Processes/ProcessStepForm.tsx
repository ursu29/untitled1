import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Checkbox, Input, Radio, Select } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => onUpdate(data)

  return (
    <Form labelCol={{ span: 24, offset: 0 }}>
      <Form.Item style={{ marginBottom: 0 }} label={<p style={{ marginBottom: '-10px' }}>Title</p>}>
        <Controller
          as={<Input />}
          name="title"
          control={control}
          onChange={([e]) => e.target.value}
          defaultValue={step.title}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0 }}
        label={<p style={{ marginBottom: '-7px' }}>Description</p>}
      >
        <Controller
          as={<Input.TextArea rows={4} />}
          name="description"
          control={control}
          onChange={([e]) => e.target.value}
          defaultValue={step.description}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0 }}
        label={<p style={{ marginBottom: '-10px' }}>Responsible</p>}
      >
        <Controller
          as={<EmployeeSelect wide mode="multiple" />}
          name="responsibleUsers"
          control={control}
          onChange={([value]) => value}
          defaultValue={step.responsibleUsers}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: -4 }}
        label={<p style={{ marginBottom: '-10px' }}>Step completion</p>}
      >
        <Controller
          as={
            <Select defaultValue="approve">
              <Option value="approve">Manual</Option>
              <Option value="notify" disabled={!step.parentSteps?.length}>
                Auto
              </Option>
              <Option value="independent">Manual independent</Option>
            </Select>
          }
          name="type"
          control={control}
          onChange={([e]) => e}
          defaultValue={step.type || 'approve'}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: -17 }}>
        <Controller
          as={<Checkbox>Include comment</Checkbox>}
          name="hasComment"
          control={control}
          onChange={([e]) => {
            return e.target.checked
          }}
          defaultValue={step.hasComment}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 5 }}>
        <Controller
          as={<Checkbox>Send notification to the project manager</Checkbox>}
          name="sendToTeamlead"
          control={control}
          onChange={([e]) => {
            return e.target.checked
          }}
          defaultValue={step.sendToTeamlead}
        />
      </Form.Item>
      <div style={{ textAlign: 'end' }}>
        <Button loading={loading} type="primary" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </Form>
  )
}

export default ProcessStepForm
