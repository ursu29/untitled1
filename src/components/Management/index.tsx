import React, { useState } from 'react'
import Employees from './Employees'
import Agile from './Agile'
import Scrum from './Scrum'
import AAD from './AAD'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import { Tabs } from 'antd'
import URLAction from '../../utils/URLAction'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import AzureLogo from '../../svg/azure-logo.svg'

export default function Management() {
  const urlAction = new URLAction()
  const [view, setView] = useState(urlAction.paramsGet('tab') || 'employees')
  const isGeneralAccess = useStrapiGroupCheck('SUPER_USER')
  const isAADAccess = useStrapiGroupCheck('AAD_EDITORS')

  return (
    <>
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
          {isGeneralAccess && (
            <>
              <Tabs.TabPane tab="Employees" key="employees" />
              <Tabs.TabPane tab="Agile Managers" key="agile" />
              <Tabs.TabPane tab="Scrum Masters" key="scrum" />
            </>
          )}
          {isAADAccess && (
            <Tabs.TabPane
              tab={
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 600,
                  }}
                >
                  <img
                    style={{ width: 24, height: 24, marginRight: 4 }}
                    src={AzureLogo}
                    alt="azure-logo"
                  />
                  Azure AD
                </span>
              }
              key="aad"
            />
          )}
        </Tabs>

        {view === 'aad' && <AAD />}
        {view === 'employees' && <Employees />}
        {view === 'agile' && <Agile />}
        {view === 'scrum' && <Scrum />}
      </PageContent>
    </>
  )
}
