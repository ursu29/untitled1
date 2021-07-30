import React, { useEffect, useCallback } from 'react'
import { Input, Form } from 'antd'
import message from '../../message'
import {
  useUpdateEmployeeHobbiesMutation,
  useUpdateEmployeeAboutMutation,
} from '../../queries/employeeSummary'
import HobbySelect from '../Hobbies/HobbySelect'
import { useDebouncedCallback } from '../../utils/useDebounce'
import { Hobby } from '../../types/graphql'
import { debounce } from 'throttle-debounce'
import { DEBOUNCE_DELAY } from '../../constants'

const arrayDiff = (a1: string[], a2: string[]) => {
  const left = a2.filter(d => !a1.includes(d))
  const right = a1.filter(d => !a2.includes(d))
  return [...left, ...right]
}

type HobbyPick = Pick<Hobby, 'id' | 'name'>

type HobbiesFormValues = {
  hobbies: HobbyPick[]
}

type HobbiesFormProps = {
  employeeId: string
  hobbies?: HobbyPick[]
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
            hobbies: values.hobbies.map(hobby => hobby.id),
          },
        },
        update: (cache, { data }) => {
          const nextHobbies = data?.updateEmployeeHobbies?.hobbies
          const prevIds = hobbies?.map(hobby => hobby.id) || []
          const nextIds = nextHobbies?.map(hobby => hobby.id) || []
          const changedIds = arrayDiff(prevIds, nextIds)

          // invalidate members for changed hobbies
          changedIds.forEach(id => {
            cache.evict({
              id: `Hobby:${id}`,
              fieldName: 'members',
            })
          })
          cache.gc()
        },
      }),
    [employeeId, hobbies, updateHobbies],
  )
  const handleSubmit = useDebouncedCallback(1000, handleHobbiesUpdate)

  return (
    <Form
      form={form}
      name="employee-hobbies"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="hobbies" initialValue={hobbies}>
        <HobbySelect onChange={form.submit} />
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

  const handleSubmit = debounce(DEBOUNCE_DELAY.FORM_INPUT, (e: any) => {
    updateAbout({
      variables: {
        input: {
          id: employeeId,
          about: e.target.value,
        },
      },
    })
  })

  return (
    <Form
      form={form}
      name="employee-about"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={form.submit}
    >
      <Form.Item name="about" initialValue={about}>
        <Input.TextArea onChange={handleSubmit} autoSize={{ minRows: 4 }} />
      </Form.Item>
    </Form>
  )
}
