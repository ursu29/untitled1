import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Input, DatePicker, Button, Tooltip } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import PageContent from '../UI/PageContent'
import updateProcessExecution from '../../queries/updateProcessExecution'
import message from '../../message'

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
  finishDate,
  employeePhone,
  refetchQueries,
}: {
  processId: string
  employee: string
  finishDate: string
  employeePhone: string
  refetchQueries: any
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
  const [employeePhoneField, setEmployeePhoneField] = useState(employeePhone || '')
  const [finishDateField, setFinishDateField] = useState(
    finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : null,
  )

  return (
    <PageContent noTop noBottom>
      <MainWrapper>
        <BlockWrapper style={{ width: '30%', minWidth: '175px' }}>
          <span style={{ paddingBottom: '8px' }}>Employee</span>
          <Input
            placeholder="Enter employee name"
            defaultValue={employee}
            onChange={e => setEmployeeField(e.target.value)}
          />
        </BlockWrapper>
        <BlockWrapper>
          <span style={{ paddingBottom: '8px' }}>Date</span>
          <DatePicker
            format={['DD.MM.YYYY']}
            defaultValue={finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : undefined}
            onChange={value => setFinishDateField(value)}
            allowClear={false}
          />
        </BlockWrapper>
        <BlockWrapper style={{ width: '20%', minWidth: '100px' }}>
          <span style={{ paddingBottom: '8px' }}>Phone</span>
          <Input
            placeholder="Enter employee phone"
            defaultValue={employeePhone}
            onChange={e => setEmployeePhoneField(e.target.value)}
          />
        </BlockWrapper>
        <BlockWrapper style={{ paddingTop: '30px' }}>
          <Tooltip placement="bottom" title="Save fields and open 'independent' steps">
            <Button
              onClick={() => {
                const body: {
                  employee?: string
                  finishDate?: moment.Moment
                  employeePhone?: string
                } = {}
                if (employeeField) body.employee = employeeField
                if (finishDateField) body.finishDate = finishDateField
                if (employeePhoneField) body.employeePhone = employeePhoneField
                makeUpdate(body)
              }}
              disabled={
                employeeField === '' ||
                finishDateField === null ||
                employeePhoneField === '' ||
                (employeeField === employee &&
                  moment(finishDateField).isSame(finishDate) &&
                  employeePhoneField === employeePhone)
              }
            >
              Save
            </Button>
          </Tooltip>
        </BlockWrapper>
      </MainWrapper>
      <BlockWrapper style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
        * fill in these fields to open 'independent' steps
      </BlockWrapper>
    </PageContent>
  )
}
