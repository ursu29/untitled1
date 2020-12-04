import { Tabs } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom'
import { COLLAPSE_WIDTH } from '../../config'
import paths, { getEmployeeLink, getProjectLink, getSkillLink } from '../../paths'

const { TabPane } = Tabs

interface Tab {
  title: any
  key: string
  icon?: any
  body: any
  hidden?: boolean
  noPadding?: boolean
}

interface Props extends RouteComponentProps {
  tab?: string
  tabs: Tab[]
  controlled?: boolean
  noPadding?: boolean
  tabsProps?: React.ComponentProps<typeof Tabs>
}

function PortalTabs({ location, history, noPadding, controlled, tabs, tab, tabsProps }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const padding = isLarge ? 60 : 15
  const addditionalProps = controlled
    ? {
        activeKey: tab || tabs[0].key,
      }
    : {}

  return (
    <Tabs
      animated={false}
      tabBarStyle={{ paddingLeft: padding, paddingRight: padding, marginBottom: 0 }}
      defaultActiveKey={tab || tabs[0].key}
      {...addditionalProps}
      // activeKey={controlled ? tab || tabs[0].key : undefined}
      tabBarGutter={0}
      onTabClick={(tab: string) => {
        // const { pathname } = location
        // const url = pathname.substr(0, pathname.lastIndexOf('/')) + '/' + tab
        // history.push(url)
        // setKey(Math.random())
        const employees: any = matchPath(location.pathname, { path: paths.EMPLOYEES + '/:email' })
        const profile: any = matchPath(location.pathname, { path: paths.PROFILE })
        const projects: any = matchPath(location.pathname, { path: paths.PROJECTS + '/:code' })
        const skills: any = matchPath(location.pathname, { path: paths.SKILLS + '/:id' })
        const knowledge: any = matchPath(location.pathname, { path: paths.KNOWLEDGE })
        if (profile) {
          history.push(paths.PROFILE + '/' + tab)
        } else if (employees) {
          history.push(getEmployeeLink(employees.params.email) + tab)
        } else if (projects) {
          history.push(getProjectLink(projects.params.code) + tab)
        } else if (skills) {
          history.push(getSkillLink(skills.params.id) + tab)
        } else if (knowledge) {
          history.push(paths.KNOWLEDGE + '/' + tab)
        }
      }}
      {...tabsProps}
    >
      {tabs.map(tab => {
        return (
          <TabPane
            tab={
              <div style={{ padding: '0 16px' }}>
                {tab.icon && tab.icon} {tab.title}
              </div>
            }
            key={tab.key}
          >
            <div
              style={{
                padding: noPadding || tab.noPadding ? 0 : isLarge ? '20px 60px' : '5px 15px',
              }}
            >
              {tab.body}
            </div>
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default withRouter(PortalTabs)
