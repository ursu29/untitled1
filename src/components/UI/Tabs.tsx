import { Tabs } from 'antd'
import React from 'react'
import URLAction from '../../utils/URLAction'

const { TabPane } = Tabs

interface Tab {
  title: any
  key: string
  icon?: any
  body: any
  hidden?: boolean
  noPadding?: boolean
}

interface Props {
  tab?: string
  tabs: Tab[]
  controlled?: boolean
  noPadding?: boolean
  tabsProps?: React.ComponentProps<typeof Tabs>
}

export default function PortalTabs({ noPadding, controlled, tabs, tab, tabsProps }: Props) {
  const urlAction = new URLAction()
  const PADDING = 16
  const additionalProps = controlled
    ? {
        activeKey: tab || urlAction.paramsGet('tab'),
      }
    : {}

  return (
    <Tabs
      animated={false}
      tabBarStyle={{ paddingLeft: PADDING, paddingRight: PADDING, marginBottom: 0, height: '48px' }}
      defaultActiveKey={urlAction.paramsGet('tab') || tabs[0].key}
      {...additionalProps}
      tabBarGutter={0}
      onTabClick={(tab: string) => {
        urlAction.paramsClear().paramsSet('tab', tab)
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
                padding: noPadding || tab.noPadding ? 0 : PADDING,
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
