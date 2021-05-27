import React, { useEffect, useCallback } from 'react'
import { Input, Form } from 'antd'
import message from '../../message'
import {
  useUpdateEmployeeHobbiesMutation,
  useUpdateEmployeeAboutMutation,
} from '../../queries/employeeSummary'
import HobbySelect from '../Hobbies/HobbySelect'
import { useDebouncedCallback } from '../../utils/useDebounce'

type HobbiesFormValues = {
  hobbies: string[]
}

type HobbiesFormProps = {
  employeeId: string
  hobbies?: { id: string }[]
}

export const HobbiesForm = ({ employeeId, hobbies }: HobbiesFormProps) => {
  const [form] = Form.useForm<HobbiesFormValues>()
  const [updateHobbies, { loading }] = useUpdateEmployeeHobbiesMutation({
    onCompleted: () => message.success('Hobbies have been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating hobbies')
    }
  }, [loading])

  const handleHobbiesUpdate = useCallback(
    (values: HobbiesFormValues) =>
      updateHobbies({
        variables: {
          input: {
            id: employeeId,
            hobbies: values.hobbies,
          },
        },
      }),
    [employeeId, updateHobbies],
  )
  const handleSubmit = useDebouncedCallback(1000, handleHobbiesUpdate)

  return (
    <Form
      form={form}
      name="employee-hobbies"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="hobbies" initialValue={hobbies?.map(hobby => hobby.id)}>
        <HobbySelect wide onChange={form.submit} />
      </Form.Item>
    </Form>
  )
}

type AboutFormValues = {
  about: string
}

type AboutFormProps = {
  employeeId: string
  about?: string
}

export const AboutForm = ({ employeeId, about }: AboutFormProps) => {
  const [form] = Form.useForm<AboutFormValues>()
  const [updateAbout, { loading }] = useUpdateEmployeeAboutMutation({
    onCompleted: () => message.success('About have been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating about')
    }
  }, [loading])

  const handleSubmit = (values: AboutFormValues) => {
    updateAbout({
      variables: {
        input: {
          id: employeeId,
          about: values.about,
        },
      },
    })
  }

  return (
    <Form
      form={form}
      name="employee-about"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="about" initialValue={about}>
        <Input.TextArea onBlur={form.submit} autoSize={{ minRows: 4 }} />
      </Form.Item>
    </Form>
  )
}
