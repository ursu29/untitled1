import { BookOutlined, ContainerOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Bookmarks from '../Bookmarks/BookmarksPage'
import Files from '../Files/FilesPage'
import PageContent from '../UI/PageContent'
import Tabs from '../UI/Tabs'

const tabs = [
  {
    title: 'Bookmarks',
    icon: <BookOutlined />,
    key: 'bookmarks',
    body: <Bookmarks />,
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
    <>
      <PageContent noBottom>
        <Typography.Title>Knowledge</Typography.Title>
      </PageContent>
      <Tabs controlled tabs={tabs} tab={tab} />
    </>
  )
}
