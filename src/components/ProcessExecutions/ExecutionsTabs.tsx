import React, { useState } from 'react'
import { QueryType } from '../../queries/getProcessExecutions'
import Tabs from '../UI/Tabs'
import ProcessList from './ProcessExecutionList'
import ProcessBoard from './ProcessExecutionBoard'
import { Select, Space } from 'antd'
import URLAction from '../../utils/URLAction'
import { LOCATION } from '../../types/api'

interface Props {
  processExecutions: QueryType['processExecutions']
}
interface ItemProps {
  label: string
  value: string
}

function ActiveProcesses({ processExecutions }: Props) {
  const urlAction = new URLAction()
  const isBoard = urlAction.paramsGet('tab') === 'board'
  const optionsCities: ItemProps[] = [
    { label: 'Saint Petersburg', value: LOCATION.SaintPetersburg },
    { label: 'Kaliningrad', value: LOCATION.Kaliningrad },
    { label: 'Tomsk', value: LOCATION.Tomsk },
    { label: 'Zurich', value: LOCATION.Zurich },
  ]
  const optionsActiveStepEmploees: ItemProps[] = []

  const [emploeeFilter, setEmploeeFilter] = useState<string[]>([])
  const [cityFilter, setCityFilter] = useState<string[]>([])

  let boardFilteredProcessExecutions = processExecutions.filter(
    i => (i.status === 'RUNNING' || i.status === 'FINISHED') && i.process.type === 'ONBOARDING',
  )

  if (!!cityFilter.length) {
    boardFilteredProcessExecutions = boardFilteredProcessExecutions.filter(i =>
      i.locations.some(loc => cityFilter.includes(loc)),
    )
  }
  if (!!emploeeFilter.length) {
    boardFilteredProcessExecutions = boardFilteredProcessExecutions.filter(i =>
      i.activeStepEmployees?.some(actEmp => emploeeFilter.includes(actEmp.id)),
    )
  }
  const empList = Array.from(
    new Set(
      boardFilteredProcessExecutions
        .map(e => e.activeStepEmployees)
        .filter(arr => !!arr?.length)
        .flat(),
    ),
  )
  empList.forEach(elem =>
    optionsActiveStepEmploees.push({ label: elem?.name || '', value: elem?.id || '' }),
  )

  const selectCityiesProps = {
    mode: 'multiple' as const,
    style: { width: '250px' },
    options: optionsCities,
    onChange: (newValue: string[]) => setCityFilter(newValue),
    placeholder: 'Location',
    maxTagCount: 'responsive' as const,
    showArrow: true,
    optionFilterProp: 'label',
  }
  const selectEmployeesProps = {
    mode: 'multiple' as const,
    style: { width: '250px', cursor: 'pointer' },
    options: optionsActiveStepEmploees,
    onChange: (newValue: string[]) => setEmploeeFilter(newValue),
    placeholder: 'Assigned to',
    maxTagCount: 'responsive' as const,
    showArrow: true,
    optionFilterProp: 'label',
  }

  const operations = (
    <div style={{ marginRight: '16px' }}>
      <Space direction="horizontal" style={{ width: '100%' }}>
        <Select {...selectEmployeesProps} />
        <Select {...selectCityiesProps} />
      </Space>
    </div>
  )

  let tabsActive = [
    {
      title: 'All',
      key: 'all',
      body: (
        <ProcessList
          items={processExecutions.filter(i => i.status === 'RUNNING')}
          onlyForMeFilter
        />
      ),
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
    {
      title: 'Board',
      key: 'board',
      body: <ProcessBoard items={boardFilteredProcessExecutions} />,
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
      body: (
        <Tabs
          noPadding
          tabs={tabsActive}
          tabsProps={{ tabBarExtraContent: isBoard && operations }}
        />
      ),
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
