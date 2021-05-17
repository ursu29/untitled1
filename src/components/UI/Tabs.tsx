import { Tabs } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
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
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const padding = isLarge ? 60 : 15
  const additionalProps = controlled
    ? {
        activeKey: tab || urlAction.paramsGet('tab'),
      }
    : {}

  return (
    <Tabs
      animated={false}
      tabBarStyle={{ paddingLeft: padding, paddingRight: padding, marginBottom: 0 }}
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
              <>
                {tab.icon && tab.icon} {tab.title}
              </>
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

// export default withRouter(PortalTabs)
