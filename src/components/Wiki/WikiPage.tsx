import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getPaths, getWikiRootSections, WikiRootSectionQueryType } from '../../queries/wiki'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'
import MainMenuItem from './MainMenuItem'
import QrWiFi from './QrWiFi'
import Search from './Search'

export default function WikiPage() {
  // Get wiki root sections
  const { data: sections } = useQuery<WikiRootSectionQueryType>(getWikiRootSections)

  // Get all wiki paths
  const { data } = useQuery(getPaths)

  return (
    <PageContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <Typography.Title>Wiki</Typography.Title>
        <Search />
      </div>
      {sections?.wikiRootSections.map((section, i) => (
        <MainMenuItem
          key={i}
          section={section}
          paths={data?.wikiPagesPaths.filter((path: string) => path.startsWith(section.path)) || []}
        />
      ))}
      <QrWiFi />
    </PageContent>
  )
}
