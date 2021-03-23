import { AutoComplete, Button, Checkbox, DatePicker, Form, Input, Modal, Radio } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import { getCitySuggestions } from './utils'
import dayjs from 'dayjs'
import { createEvent } from '../../queries/events'
import { useMutation } from '@apollo/react-hooks'
import message from '../../message'

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 15px;
  }
`

export default function ModalAddEvent({
  visible,
  handleClose,
  refetchQueries,
}: {
  visible: boolean
  handleClose: any
  refetchQueries: { query: any; variables: any }[]
}) {
  const [form] = Form.useForm()
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [isOnline, setIsOnline] = useState(false)

  const [create, { loading }] = useMutation(createEvent, {
    onCompleted: () => message.success('Event has been created'),
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
  })

  const resetState = () => {
    setCitySuggestions([])
    setIsOnline(false)
  }

  if (isOnline) {
    form.resetFields(['city', 'address'])
  }

  const rules = [{ required: true, message: 'This is required field!' }]

  const debouncedGetCitySuggestions = debounce(400, async searchText => {
    const suggestions = await getCitySuggestions(searchText)
    setCitySuggestions(suggestions)
  })

  const handleFinish = ({ date, skills, ...values }: any) => {
    const event = {
      ...values,
      importance: values.importance ? 'HIGH' : 'NORMAL',
      skills: skills?.map((e: any) => e.id) || undefined,
      start: dayjs(date[0]).toISOString(),
      end: dayjs(date[1]).toISOString(),
    }
    create({ variables: { input: event } })
    handleClose()
    form.resetFields()
    resetState()
  }

  return (
    <Modal
      centered
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      width={545}
      title="Event creation"
      visible={visible}
      onCancel={() => {
        handleClose()
        form.resetFields()
        resetState()
      }}
      destroyOnClose={true}
      footer={null}
    >
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isExternal: false, isOnline: false, isImportant: false }}
      >
        <Form.Item label="Title" name="title" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item name="isExternal">
          <Radio.Group>
            <Radio value={false}>Internal</Radio>
            <Radio value={true}>External</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="isOnline" valuePropName="checked">
          <Checkbox
            onChange={event => {
              setIsOnline(event.target.checked)
            }}
          >
            Online event
          </Checkbox>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={
            isOnline
              ? []
              : [
                  ...rules,
                  { min: 3, message: 'City must be at least 3 characters!' },
                  () => ({
                    validator(_, value) {
                      if (value.length < 3 || citySuggestions.includes(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Choose a city from the list!'))
                    },
                  }),
                ]
          }
        >
          <AutoComplete
            options={citySuggestions?.map(city => ({ label: city, value: city }))}
            onSearch={async searchText => {
              if (searchText.length < 3) {
                setCitySuggestions([])
                return
              }
              debouncedGetCitySuggestions(searchText)
            }}
            disabled={isOnline}
          />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={isOnline ? [] : rules}>
          <Input disabled={isOnline} />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={rules}>
          <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Skills" name="skills">
          <SkillTreeSelect />
        </Form.Item>
        <Form.Item label="Link (more info)" name="link">
          <Input />
        </Form.Item>
        <Form.Item name="importance" valuePropName="checked">
          <Checkbox>Important</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </StyledForm>
    </Modal>
  )
}
