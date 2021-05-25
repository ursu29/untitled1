import { useQuery } from '@apollo/client'
import React from 'react'
import getProcessExecutions, { QueryType } from '../../queries/getProcessExecutions'
import Skeleton from '../UI/Skeleton'
import ActiveProcesses from './ExecutionsTabs'
import PageContent from '../UI/PageContent'
import CreateProcessExecution from './CreateProcessExecution'
import NotAllowed from '../UI/NotAllowed'
import isForbidden from '../../utils/isForbidden'
import PageHeader from '../UI/PageHeader'

function HRPage() {
  const { data, loading, error } = useQuery<QueryType>(getProcessExecutions)
  if (isForbidden(error)) {
    return (
      <PageContent>
        <NotAllowed />
      </PageContent>
    )
  }
  return (
    <>
      <PageHeader title="Open processes" extra={[<CreateProcessExecution />]} />
      <Skeleton active loading={loading} withOffset>
        <PageContent noBottom>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 'fit-content' }}>
            <div style={{ marginRight: '24px' }}>
              Rotation: <span style={{ color: '#00000073' }}>Agile manager</span>
            </div>
            <div style={{ marginRight: '24px' }}>
              Onboarding: <span style={{ color: '#00000073' }}>HR</span>
            </div>
            <div>
              Offboarding:{' '}
              <span style={{ color: '#00000073' }}>Ekaterina Makova, Irina Zaloznykh</span>
            </div>
          </div>
        </PageContent>
        <ActiveProcesses processExecutions={data?.processExecutions || []} />
      </Skeleton>
    </>
  )
}

export default HRPage
