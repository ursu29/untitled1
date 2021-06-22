import React from 'react'
import { Space, Input, Form, Switch } from 'antd'
import HobbySelect from './HobbySelect'
import { Hobby } from '../../types/graphql'
import { useDebouncedCallback } from '../../utils/useDebounce'

type FormFields = {
  search: string
  hobbies: Pick<Hobby, 'id' | 'name'>[]
  isTranslated: boolean
}

type Props = {
  onSubmit: (values: FormFields) => void
}

const HobbiesFilter = ({ onSubmit }: Props) => {
  const [form] = Form.useForm<FormFields>()
  const handleSubmit = useDebouncedCallback(1000, onSubmit)

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item label="" name="search" noStyle initialValue="">
          <Input placeholder="Search" onBlur={form.submit} />
        </Form.Item>
        <Form.Item label="" name="hobbies" noStyle initialValue={[]}>
          <HobbySelect onChange={form.submit} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item
            colon={false}
            label="Translated only"
            name="isTranslated"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch style={{ marginLeft: 8 }} onChange={form.submit} />
          </Form.Item>
        </div>
      </Space>
    </Form>
  )
}

export default HobbiesFilter
