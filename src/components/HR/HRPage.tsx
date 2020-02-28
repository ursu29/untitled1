import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getProcessExecutions, { QueryType } from '../../queries/getProcessExecutions'
import Skeleton from '../UI/Skeleton'
import ActiveProcesses from './ActiveProcesses'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'

function HRPage() {
  const { data, loading } = useQuery<QueryType>(getProcessExecutions)

  return (
    <Skeleton active loading={loading} padding={24}>
      <PageContent noBottom>
        <Typography.Title>Open processes</Typography.Title>
      </PageContent>
      <ActiveProcesses processExecutions={data?.processExecutions || []} />
    </Skeleton>
  )
}

export default HRPage
