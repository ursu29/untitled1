import React from 'react'
import { Tabs, Typography } from 'antd'
import PageContent from '../UI/PageContent'
import Bookmarks from '../Bookmarks/BookmarksPage'
import Files from '../Files/FilesPage'
import Stream from '../Stream/StreamPage'
import { BookOutlined, ContainerOutlined, VideoCameraOutlined } from '@ant-design/icons'

const tabs = [
  {
    title: 'Bookmarks',
    icon: <BookOutlined />,
    key: 'bookmarks',
    body: <Bookmarks />,
  },
  {
    title: 'Stream',
    icon: <VideoCameraOutlined />,
    key: 'stream',
    body: <Stream />,
  },
  {
    title: 'Files',
    icon: <ContainerOutlined />,
    key: 'files',
    body: <Files />,
  },
]

const { TabPane } = Tabs

export default function Knowledge() {
  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>Knowledge</Typography.Title>
      <Tabs>
        {tabs.map(tab => (
          <TabPane
            tab={
              <span>
                {tab.icon}
                {tab.title}
              </span>
            }
            key={tab.key}
            style={{ paddingTop: '10px' }}
          >
            {tab.body}
          </TabPane>
        ))}
      </Tabs>
    </PageContent>
  )
}
