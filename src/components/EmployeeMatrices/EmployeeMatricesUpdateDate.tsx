import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee } from '../../types'
import moment from 'moment'
import message from '../../message'

const matricesCustomFields = gql`
  query matricesCustomFields($input: MatricesCustomFieldsInput) {
    matricesCustomFields(input: $input) {
      id
      employeeMail
      lastDiscussed
    }
  }
`

const customFieldsMutation = gql`
  mutation matricesCustomFieldsMutation($input: UpdateMatricesCustomFieldsInput!) {
    updateMatricesCustomFields(input: $input) {
      id
    }
  }
`

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeMatrix({ employee }: Props) {
  const { data } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee?.id } },
    skip: !employee,
  })

  const { data: customFields } = useQuery(matricesCustomFields, {
    variables: {
      input: {
        employee: employee?.id,
      },
    },
    skip: !employee,
  })

  const [addCustomField] = useMutation(customFieldsMutation, {
    refetchQueries: [
      {
        query: matricesCustomFields,
        variables: {
          input: {
            employee: employee?.id,
          },
        },
      },
    ],
    onCompleted: () => message.success('Evaluation is updated'),
    onError: message.error,
  })

  if (!employee) return null

  let updatedAt: any = null

  const employeeFound = data?.employees[0]

  employeeFound?.experiences?.forEach(i => {
    if (!updatedAt || dayjs(i.updatedAt).isAfter(dayjs(updatedAt))) {
      updatedAt = i.updatedAt
    }
  })

  if (!updatedAt) return null

  return (
    <Space size="middle">
      <Typography.Text>
        Last discussed:{' '}
        <DatePicker
          size="small"
          allowClear={false}
          format={['DD.MM.YYYY']}
          value={
            customFields?.matricesCustomFields?.lastDiscussed
              ? moment(
                  moment(customFields?.matricesCustomFields?.lastDiscussed).local(),
                  'DD.MM.YYYY',
                )
              : null
          }
          onChange={date =>
            addCustomField({
              variables: {
                input: { employee: employee.id, lastDiscussed: moment(date).local().format() },
              },
            })
          }
        />
      </Typography.Text>

      {updatedAt ? (
        <Typography.Text disabled>
          Last updated: {dayjs(updatedAt).format('DD MMM YYYY HH:mm')}
        </Typography.Text>
      ) : null}
    </Space>
  )
}
