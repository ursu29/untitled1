import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Checkbox, Input, Radio } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import EmployeeSelect from '../Employees/EmployeeSelect'

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
    <Form>
      <Form.Item style={{ marginBottom: 0 }} label="Title">
        <Controller
          as={<Input />}
          name="title"
          control={control}
          onChange={([e]) => e.target.value}
          defaultValue={step.title}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }} label="Description">
        <Controller
          as={<Input.TextArea rows={4} />}
          name="description"
          control={control}
          onChange={([e]) => e.target.value}
          defaultValue={step.description}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }} label="Responsible">
        <Controller
          as={<EmployeeSelect wide mode="multiple" />}
          name="responsibleUsers"
          control={control}
          onChange={([value]) => value}
          defaultValue={step.responsibleUsers}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Controller
          as={
            <Radio.Group>
              <Radio value="approve">Add 'Complete' button</Radio>
              <Radio value="notify" disabled={!step.parentSteps?.length}>
                Autocomplete
              </Radio>
            </Radio.Group>
          }
          name="type"
          control={control}
          onChange={([e]) => {
            return e.target.value
          }}
          defaultValue={step.type || 'approve'}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
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
      <Form.Item style={{ marginBottom: 0 }}>
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
      <Button loading={loading} type="primary" onClick={handleSubmit(onSubmit)}>
        Save
      </Button>
    </Form>
  )
}

export default ProcessStepForm
