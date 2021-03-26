import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Input, DatePicker, Button, Tooltip } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import PageContent from '../UI/PageContent'
import updateProcessExecution from '../../queries/updateProcessExecution'
import message from '../../message'
import EmployeeSelect from '../Employees/EmployeeSelect'

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`

export default function AdditionalInfo({
  processId,
  employee,
  employeeRef,
  finishDate,
  employeePhone,
  swissReOffboardingDate,
  refetchQueries,
  isNotOnboarding,
  isSwissRe,
}: {
  processId: string
  employee: string
  employeeRef: string
  finishDate: string
  employeePhone: string
  swissReOffboardingDate: string
  refetchQueries: any
  isNotOnboarding: boolean
  isSwissRe: boolean
}) {
  const [update] = useMutation(updateProcessExecution, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Updated')
    },
    onError: message.error,
  })

  const makeUpdate = (body: any) => update({ variables: { input: { id: processId, ...body } } })

  const [employeeField, setEmployeeField] = useState(employee || '')
  const [employeeRefField, setEmployeeRefField] = useState(employeeRef || '')
  const [employeePhoneField, setEmployeePhoneField] = useState(employeePhone || '')
  const [finishDateField, setFinishDateField] = useState(
    finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : null,
  )

  return (
    <PageContent noTop noBottom>
      <MainWrapper>
        <BlockWrapper style={{ width: '30%', minWidth: '175px' }}>
          <span style={{ paddingBottom: '8px' }}>* Employee</span>
          {isNotOnboarding ? (
            <EmployeeSelect
              wide
              keyName="id"
              //@ts-expect-error
              onChange={e => setEmployeeRefField(e)}
              value={employeeRefField}
            />
          ) : (
            <Input
              data-cy="name"
              placeholder="Enter employee name"
              defaultValue={employee}
              onChange={e => setEmployeeField(e.target.value)}
            />
          )}
        </BlockWrapper>
        <BlockWrapper>
          <span style={{ paddingBottom: '8px' }}>* Date</span>
          <DatePicker
            format={['DD.MM.YYYY']}
            defaultValue={finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : undefined}
            onChange={value => setFinishDateField(value?.utcOffset(180) || null)}
            allowClear={false}
          />
        </BlockWrapper>
        <BlockWrapper style={{ width: '20%', minWidth: '100px' }}>
          <span style={{ paddingBottom: '8px' }}>* Phone</span>
          <Input
            data-cy="phone"
            placeholder="Enter employee phone"
            defaultValue={employeePhone}
            onChange={e => setEmployeePhoneField(e.target.value)}
          />
        </BlockWrapper>
        <BlockWrapper style={{ paddingTop: '30px' }}>
          <Tooltip placement="bottom" title="Save fields and open 'independent' steps">
            <Button
              data-cy="saveEmployee"
              onClick={() => {
                const body: {
                  employee?: string
                  employeeRef?: string
                  finishDate?: moment.Moment
                  employeePhone?: string
                } = {}
                if (employeeField) body.employee = employeeField
                if (employeeRefField) body.employeeRef = employeeRefField
                if (finishDateField) body.finishDate = finishDateField
                if (employeePhoneField) body.employeePhone = employeePhoneField
                makeUpdate(body)
              }}
              disabled={
                (employeeField === '' && !isNotOnboarding) ||
                (employeeRefField === '' && isNotOnboarding) ||
                finishDateField === null ||
                employeePhoneField === '' ||
                (!!employee &&
                  !isNotOnboarding &&
                  employeeField === employee &&
                  moment(finishDateField).isSame(finishDate) &&
                  employeePhoneField === employeePhone) ||
                (!!employeeRef &&
                  isNotOnboarding &&
                  employeeRefField === employeeRef &&
                  moment(finishDateField).isSame(finishDate) &&
                  employeePhoneField === employeePhone)
              }
            >
              Save
            </Button>
          </Tooltip>
        </BlockWrapper>
        {isNotOnboarding && isSwissRe && (
          <BlockWrapper style={{ marginLeft: '32px' }}>
            <span style={{ paddingBottom: '8px' }}>SwissRe Offboarding</span>
            <DatePicker
              format={['DD.MM.YYYY']}
              defaultValue={
                swissReOffboardingDate
                  ? moment(moment(swissReOffboardingDate), ['DD.MM.YYYY'])
                  : undefined
              }
              onChange={value =>
                makeUpdate({ swissReOffboardingDate: value?.utcOffset(180) || null })
              }
            />
          </BlockWrapper>
        )}
      </MainWrapper>
      <BlockWrapper style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
        * fill in these fields to open 'independent' steps
      </BlockWrapper>
    </PageContent>
  )
}
