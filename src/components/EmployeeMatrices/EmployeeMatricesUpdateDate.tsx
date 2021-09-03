import { gql, useMutation, useQuery } from '@apollo/client'
import { DatePicker, Input } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import React from 'react'
import message from '../../message'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee } from '../../types'
import ArchiveMatrix from './ArchiveMatrix'

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
  employee?: Pick<Employee, 'id' | 'matrices'>
  currentTab?: string
  isArchivedChosen: boolean
  onSelectVersion: (version: string) => void
}

export default function EmployeeMatrix({
  currentTab,
  employee,
  isArchivedChosen,
  onSelectVersion,
}: Props) {
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
    onCompleted: () => message.success('Date is updated'),
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
    <>
      <div>
        <ArchiveMatrix
          employee={data?.employees[0].id || ''}
          matrixId={currentTab || ''}
          employeeMatrixId={
            employee.matrices.find(e => e.id === currentTab)?.employeeMatrixId || ''
          }
          onSelectVersion={onSelectVersion}
          createSnapshotShown={!isArchivedChosen}
        />
      </div>
      <div id="datepicker" style={{ width: '200px' }}>
        Last discussed: <br />
        <DatePicker
          style={{ width: '100%', marginTop: '5px' }}
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
      </div>

      {updatedAt ? (
        <div style={{ width: '200px' }}>
          Last updated:
          <Input
            size="small"
            disabled
            placeholder={dayjs(updatedAt).format('DD MMM YYYY HH:mm')}
            style={{ marginTop: '5px' }}
          />
        </div>
      ) : null}
    </>
  )
}
