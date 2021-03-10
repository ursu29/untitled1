import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import Tabs from '../UI/Tabs'
import ProcessList from './ProcessExecutionList'

interface Props {
  processExecutions: QueryType['processExecutions']
}

function ActiveProcesses({ processExecutions }: Props) {
  const tabsActive = [
    {
      title: 'All',
      key: 'all',
      body: <ProcessList items={processExecutions.filter(i => i.status === 'RUNNING')} />,
    },
    {
      title: 'Onboarding',
      key: 'onboarding',
      body: (
        <ProcessList
          items={processExecutions.filter(
            i => i.status === 'RUNNING' && i.process.type === 'ONBOARDING',
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
            i => i.status === 'RUNNING' && i.process.type === 'OFFBOARDING',
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
            i => i.status === 'RUNNING' && i.process.type === 'ROTATION',
          )}
        />
      ),
    },
  ]

  const tabsInactive = [
    {
      title: 'On hold',
      key: 'holding',
      body: (
        <ProcessList
          items={processExecutions.filter(i => i.status === 'HOLDING')}
          tabName="archived"
        />
      ),
    },
    {
      title: 'Archived',
      key: 'archived',
      body: (
        <ProcessList
          items={processExecutions.filter(i => i.status !== 'RUNNING' && i.status !== 'HOLDING')}
          tabName="archived"
        />
      ),
    },
  ]

  const mainTabs = [
    {
      title: 'Active',
      key: 'active',
      body: <Tabs noPadding tabs={tabsActive} />,
    },
    {
      title: 'Inactive',
      key: 'inactive',
      body: <Tabs noPadding tabs={tabsInactive} />,
    },
  ]

  return <Tabs tabsProps={{ tabBarGutter: 5, type: 'card' }} noPadding tabs={mainTabs} />
}

export default ActiveProcesses
