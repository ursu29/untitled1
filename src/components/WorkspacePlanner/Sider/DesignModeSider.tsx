import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import Sider from './Sider'
import { WorkplaceType } from '../../../types'

interface Props {
  workplace: Partial<WorkplaceType>
  onSave: any
  isOpen: boolean
  onOpen: any
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

export default function DesignModeSider({ workplace, onSave, isOpen, onOpen }: Props) {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    onSave({
      variables: {
        input: {
          id: workplace.id,
          number: Number.parseInt(values.number),
        },
      },
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    form.setFieldsValue({
      number: workplace.number,
    })
  }, [workplace])

  return (
    <Sider isOpen={isOpen} onOpen={onOpen}>
      <Form
        {...layout}
        form={form}
        name="workplace settings"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ paddingTop: '20px' }}
      >
        <Form.Item label="Number" name="number">
          <Input type="number" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Sider>
  )
}
