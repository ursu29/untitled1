import React, { useState } from 'react'
import Employees from './Employees'
import Agile from './Agile'
import Scrum from './Scrum'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import { Tabs } from 'antd'
import URLAction from '../../utils/URLAction'
import Helmet from '../Helmet'

export default function Management() {
  const urlAction = new URLAction()
  const [view, setView] = useState(urlAction.paramsGet('tab') || 'employees')

  return (
    <>
      <Helmet title="Management" />
      <PageHeader title="Management" withoutDivider />
      <PageContent style={{ paddingLeft: 0, paddingRight: 0, marginTop: '-32px' }}>
        <Tabs
          defaultActiveKey={view}
          onTabClick={key => {
            setView(key)
            urlAction.paramsSet('tab', key)
          }}
          tabBarStyle={{ padding: '0 0 0 24px' }}
        >
          <Tabs.TabPane tab="Employees" key="employees" />
          <Tabs.TabPane tab="Agile Managers" key="agile" />
          <Tabs.TabPane tab="Scrum Masters" key="scrum" />
        </Tabs>

        {view === 'employees' && <Employees />}
        {view === 'agile' && <Agile />}
        {view === 'scrum' && <Scrum />}
      </PageContent>
    </>
  )
}
