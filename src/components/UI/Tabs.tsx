import React from 'react'
import { Tabs } from 'antd'
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom'
import paths, { getEmployeeLink } from '../../paths'
import PageContent from './PageContent'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import { IconProps } from 'antd/lib/icon'

const { TabPane } = Tabs

interface Tab {
  title: any
  key: string
  icon?: IconProps['type']
  body: any
  hidden?: boolean
}

interface Props extends RouteComponentProps {
  tab?: string
  tabs: Tab[]
}

function PortalTabs({ location, history, tabs, tab }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const padding = isLarge ? 60 : 15
  return (
    // <div style={{ maxWidth: isLarge ? 'unset' : 'calc(100vw - 80px)' }}>
    <Tabs
      tabBarStyle={{ paddingLeft: padding, paddingRight: padding }}
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
    // </div>
  )
}

export default withRouter(PortalTabs)
