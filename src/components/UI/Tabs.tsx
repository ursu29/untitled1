import { Icon, Tabs } from 'antd'
import { IconProps } from 'antd/lib/icon'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom'
import { COLLAPSE_WIDTH } from '../../config'
import paths, { getEmployeeLink, getProjectLink } from '../../paths'

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
    <Tabs
      animated={false}
      tabBarStyle={{ paddingLeft: padding, paddingRight: padding }}
      defaultActiveKey={tab || tabs[0].key}
      tabBarGutter={0}
      onTabClick={(tab: string) => {
        // const { pathname } = location
        // const url = pathname.substr(0, pathname.lastIndexOf('/')) + '/' + tab
        // history.push(url)
        // setKey(Math.random())
        const employees: any = matchPath(location.pathname, { path: paths.EMPLOYEES + '/:email' })
        const profile: any = matchPath(location.pathname, { path: paths.PROFILE })
        const projects: any = matchPath(location.pathname, { path: paths.PROJECTS + '/:code' })
        if (profile) {
          history.push(paths.PROFILE + '/' + tab)
        } else if (employees) {
          history.push(getEmployeeLink(employees.params.email) + tab)
        } else if (projects) {
          history.push(getProjectLink(projects.params.code) + tab)
        }
      }}
    >
      {tabs.map(tab => {
        return (
          <TabPane
            tab={
              <>
                {tab.icon && <Icon type={tab.icon} />} {tab.title}
              </>
            }
            key={tab.key}
          >
            <div style={{ padding: isLarge ? '20px 60px' : '5px 15px' }}>{tab.body}</div>
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default withRouter(PortalTabs)
