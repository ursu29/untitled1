import { Input, Form, Typography } from 'antd'
import React, { useEffect } from 'react'
import message from '../../message'
import { CurriculumVitae, Employee } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'

const { Title } = Typography

type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'summary'>

type FormValues = {
  summary: string
}

type FormProps = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

const EmployeeCVSummary = ({ editable, employee, cv }: FormProps) => {
  const [form] = Form.useForm<FormValues>()
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Summary has been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating summary')
    }
  }, [loading])

  return (
    <Form
      form={form}
      name="employee-cv"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={values => {
        update({
          variables: {
            input: {
              employee: employee.id,
              id: cv?.id,
              summary: values.summary,
            },
          },
        })
      }}
    >
      <Title level={5}>Summary</Title>
      <Form.Item name="summary" label="" initialValue={cv?.summary}>
        {editable ? (
          <Input.TextArea autoSize={{ minRows: 4 }} onBlur={form.submit} />
        ) : (
          <Typography.Text>{cv?.summary}</Typography.Text>
        )}
      </Form.Item>
    </Form>
  )
}

export default EmployeeCVSummary
