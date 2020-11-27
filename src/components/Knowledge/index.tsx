import React from 'react'
import { Typography } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import Tabs from '../UI/Tabs'
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
    title: 'Streams',
    icon: <VideoCameraOutlined />,
    key: 'streams',
    body: <Stream />,
  },
  {
    title: 'Files',
    icon: <ContainerOutlined />,
    key: 'files',
    body: <Files />,
  },
]

interface Props extends RouteComponentProps<{ tab: string }> {}

export default function Knowledge({ match }: Props) {
  const { tab } = match.params
  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>Knowledge</Typography.Title>
      <Tabs controlled tabs={tabs} tab={tab} />
    </PageContent>
  )
}
