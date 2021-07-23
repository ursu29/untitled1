import { Input, Typography } from 'antd'
import React, { useEffect } from 'react'
import message from '../../message'
import { CurriculumVitae, Employee } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'

const { Title } = Typography

type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'languages'>

type FormProps = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

const EmployeeCVLanguages = ({ editable, employee, cv }: FormProps) => {
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Languages have been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating languages')
    }
  }, [loading])

  return (
    <>
      <Title level={4} style={{ marginBottom: 16 }}>
        Languages
      </Title>
      {editable ? (
        <Input
          placeholder="Enter languages"
          defaultValue={cv?.languages || ''}
          onBlur={event =>
            update({
              variables: {
                input: {
                  id: cv?.id,
                  employee: employee.id,
                  languages: event.target.value,
                },
              },
            })
          }
        />
      ) : (
        <Typography.Text>{cv?.languages}</Typography.Text>
      )}
    </>
  )
}

export default EmployeeCVLanguages
