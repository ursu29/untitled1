import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FireOutlined, FileTextOutlined } from '@ant-design/icons'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import HobbiesFeed from './HobbiesFeed'
import HobbiesPage from './HobbiesPage'
import { Tabs } from 'antd'
import PATHS from '../../paths'

const tabs = [
  {
    title: 'Feed',
    icon: <FireOutlined />,
    key: 'feed',
    body: <HobbiesFeed />,
  },
  {
    title: 'Hobbies',
    icon: <FileTextOutlined />,
    key: 'list',
    body: <HobbiesPage />,
  },
]

export default function Hobbies() {
  const { tab = 'feed' } = useParams<{ tab: string }>()
  const history = useHistory()

  return (
    <>
      <PageHeader title="Hobbies" withoutDivider />
      <PageContent style={{ paddingLeft: 0, paddingRight: 0, marginTop: '-32px' }}>
        <Tabs
          activeKey={tab}
          onChange={tab => history.push(`${PATHS.HOBBIES}/${tab}`)}
          tabBarStyle={{ padding: '0 0 0 24px' }}
        >
          {tabs.map(item => (
            <Tabs.TabPane
              tab={
                <span>
                  {item.icon} {item.title}
                </span>
              }
              key={item.key}
            >
              <div style={{ margin: '0 24px 16px' }}>{item.body}</div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </PageContent>
    </>
  )
}
