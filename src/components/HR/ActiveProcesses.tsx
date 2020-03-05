import React from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import Tabs from '../UI/Tabs'
import ProcessList from './ProcessList'

interface Props {
  processExecutions: QueryType['processExecutions']
}

function ActiveProcesses({ processExecutions }: Props) {
  const tabs = [
    {
      title: 'All',
      key: 'all',
      body: <ProcessList items={processExecutions} />,
    },
    {
      title: 'Onboarding',
      key: 'onboarding',
      body: (
        <ProcessList
          items={processExecutions.filter(
            i => i.process.type === 'onboarding' && !i.process.isRotation,
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
            i => i.process.type === 'offboarding' && !i.process.isRotation,
          )}
        />
      ),
    },
    {
      title: 'Rotation',
      key: 'rotation',
      body: <ProcessList items={processExecutions.filter(i => i.process.isRotation)} />,
    },
    {
      title: 'Want to rotate',
      key: 'to_rotate',
      body: <div>Who wants to rotate</div>,
    },
  ]

  return <Tabs noPadding tabs={tabs} />
}

export default ActiveProcesses
