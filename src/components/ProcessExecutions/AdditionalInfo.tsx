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
  refetchQueries,
}: {
  processId: string
  employee: string
  finishDate: string
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

  const [employeeField, setEmployeeField] = useState('')
  const [finishDateField, setFinishDateField] = useState<moment.Moment | null>(null)

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
            onChange={value => setFinishDateField(value?.utcOffset(180) || null)}
            allowClear={false}
          />
        </BlockWrapper>
        <BlockWrapper style={{ paddingTop: '30px' }}>
          <Tooltip placement="bottom" title="Save fields and open 'independent' steps">
            <Button
              onClick={() => {
                const body: { employee?: string; finishDate?: moment.Moment } = {}
                if (employeeField) body.employee = employeeField
                if (finishDateField) body.finishDate = finishDateField
                makeUpdate(body)
              }}
              disabled={employeeField === '' && finishDateField === null}
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
