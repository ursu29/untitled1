import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Bookmarks from '../Bookmarks/BookmarksPage'
import Files from '../Files/FilesPage'
import PageContent from '../UI/PageContent'
import Tabs from '../UI/Tabs'
import PageHeader from '../UI/PageHeader'

const tabs = [
  {
    title: 'Bookmarks',
    key: 'bookmarks',
    body: <Bookmarks />,
  },
  {
    title: 'Files',
    key: 'files',
    body: <Files />,
  },
]

interface Props extends RouteComponentProps<{ tab: string }> {}

export default function Knowledge({ match }: Props) {
  const { tab } = match.params
  return (
    <>
      <PageHeader title="Knowledge" />
      <PageContent>
        <Tabs controlled tabs={tabs} tab={tab} />
      </PageContent>
    </>
  )
}
