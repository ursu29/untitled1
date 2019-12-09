import React from 'react'
import { Tabs } from 'antd'
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom'
import paths, { getEmployeeLink } from '../../paths'
import PageContent from './PageContent'

const { TabPane } = Tabs

interface Tab {
  title: any
  key: string
  body: any
  hidden?: boolean
}

interface Props extends RouteComponentProps {
  tab?: string
  tabs: Tab[]
}

function PortalTabs({ location, history, tabs, tab }: Props) {
  return (
    <Tabs
      tabPosition="top"
      tabBarStyle={{ paddingLeft: 60, paddingRight: 60 }}
      defaultActiveKey={tab || tabs[0].key}
      onTabClick={(tab: string) => {
        // const { pathname } = location
        // const url = pathname.substr(0, pathname.lastIndexOf('/')) + '/' + tab
        // history.push(url)
        // setKey(Math.random())
        const employees: any = matchPath(location.pathname, { path: paths.EMPLOYEES + '/:email' })
        const profile: any = matchPath(location.pathname, { path: paths.PROFILE })
        if (profile) {
          history.push(paths.PROFILE + '/' + tab)
        } else if (employees) {
          history.push(getEmployeeLink(employees.params.email) + tab)
        }
      }}
    >
      {tabs.map(tab => {
        return (
          <TabPane tab={tab.title} key={tab.key}>
            <div style={{ padding: '20px 60px' }}>{tab.body}</div>
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default withRouter(PortalTabs)
