import { Radio, Tabs } from 'antd'
import React, { useState } from 'react'
import AzureLogo from '../../svg/azure-logo.svg'
import URLAction from '../../utils/URLAction'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import AAD from './AAD'
import Agile from './Agile'
import Employees from './Employees'
import Scrum from './Scrum'

export default function Management() {
  const urlAction = new URLAction()
  const isGeneralAccess = useStrapiGroupCheck('SUPER_USER')
  const isAADCreators = useStrapiGroupCheck('AAD_CREATORS')
  const isAADUserEditors = useStrapiGroupCheck('AAD_USER_EDITORS')
  const isAADGroupEditors = useStrapiGroupCheck('AAD_GROUP_EDITORS')
  const isAADAccess = isAADCreators || isAADUserEditors || isAADGroupEditors
  const [view, setView] = useState(
    urlAction.paramsGet('tab') || isGeneralAccess ? 'employees' : 'aad',
  )
  const [aadSection, setAadSection] = useState<'users' | 'groups'>(
    isAADCreators || isAADUserEditors ? 'users' : 'groups',
  )

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
          tabBarStyle={{ padding: '0 24px 0 24px' }}
          tabBarExtraContent={
            view === 'aad' ? (
              <Radio.Group onChange={e => setAadSection(e.target.value)} defaultValue={aadSection}>
                <Radio.Button value="users" disabled={!isAADCreators && !isAADUserEditors}>
                  Users
                </Radio.Button>
                <Radio.Button value="groups" disabled={!isAADCreators && !isAADGroupEditors}>
                  Groups
                </Radio.Button>
              </Radio.Group>
            ) : undefined
          }
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

        {view === 'aad' && isAADAccess && <AAD view={aadSection} createAccess={isAADCreators} />}
        {view === 'employees' && isGeneralAccess && <Employees />}
        {view === 'agile' && isGeneralAccess && <Agile />}
        {view === 'scrum' && isGeneralAccess && <Scrum />}
      </PageContent>
    </>
  )
}
