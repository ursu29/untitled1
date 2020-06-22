import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import Tabs from '../UI/Tabs'
import ProcessList from './ProcessExecutionList'

interface Props {
  processExecutions: QueryType['processExecutions']
}

function ActiveProcesses({ processExecutions }: Props) {
  const tabs = [
    {
      title: 'All',
      key: 'all',
      body: <ProcessList items={processExecutions.filter((i) => i.status === 'running')} />,
    },
    {
      title: 'Onboarding',
      key: 'onboarding',
      body: (
        <ProcessList
          items={processExecutions.filter(
            (i) => i.status === 'running' && i.process.type === 'onboarding',
          )}
        />
      ),
    },
    {
      title: 'Offboarding',
      key: 'offboarding',
      body: (
        <ProcessList
          items={processExecutions.filter(
            (i) => i.status === 'running' && i.process.type === 'offboarding',
          )}
        />
      ),
    },
    {
      title: 'Rotation',
      key: 'rotation',
      body: (
        <ProcessList
          items={processExecutions.filter(
            (i) => i.status === 'running' && i.process.type === 'rotation',
          )}
        />
      ),
    },
    {
      title: 'Archived',
      key: 'archived',
      body: <ProcessList items={processExecutions.filter((i) => i.status !== 'running')} />,
    },
  ]

  return <Tabs noPadding tabs={tabs} />
}

export default ActiveProcesses