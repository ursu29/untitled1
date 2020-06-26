import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getPaths, getWikiRootSections, WikiRootSectionQueryType } from '../../queries/wiki'
import { Typography } from 'antd'
import PageContent from '../UI/PageContent'
import MainMenuItem from './MainMenuItem'
import QrWiFi from './QrWiFi'

export default function WikiPage() {
  // Get wiki root sections
  const { data: sections } = useQuery<WikiRootSectionQueryType>(getWikiRootSections)

  // Get all wiki paths
  const { data, loading, error } = useQuery(getPaths)

  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>Wiki</Typography.Title>
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
