import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getProcessExecutions, { QueryType } from '../../queries/getProcessExecutions'
import Skeleton from '../UI/Skeleton'
import ActiveProcesses from './ActiveProcesses'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'
import CreateProcessExecution from './CreateProcessExecution'

function HRPage() {
  const { data, loading } = useQuery<QueryType>(getProcessExecutions)

  return (
    <Skeleton active loading={loading} padding={24}>
      <PageContent noBottom>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Title>Open processes</Typography.Title> <CreateProcessExecution />
        </div>
      </PageContent>
      <ActiveProcesses processExecutions={data?.processExecutions || []} />
    </Skeleton>
  )
}

export default HRPage
