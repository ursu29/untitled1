import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Input, DatePicker } from 'antd'
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

  return (
    <PageContent noTop noBottom>
      <MainWrapper>
        <BlockWrapper style={{ width: '30%', minWidth: '175px' }}>
          <span style={{ paddingBottom: '8px' }}>Employee</span>
          <Input
            placeholder="Enter employee name"
            defaultValue={employee}
            onBlur={e => makeUpdate({ employee: e.target.value })}
          />
        </BlockWrapper>
        <BlockWrapper>
          <span style={{ paddingBottom: '8px' }}>Date</span>
          <DatePicker
            format={['DD.MM.YYYY']}
            defaultValue={finishDate ? moment(moment(finishDate), ['DD.MM.YYYY']) : undefined}
            onChange={value => makeUpdate({ finishDate: value })}
            allowClear={false}
          />
        </BlockWrapper>
      </MainWrapper>
    </PageContent>
  )
}
