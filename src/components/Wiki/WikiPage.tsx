import { useQuery } from "@apollo/client";
import React from 'react'
import { getPaths, getWikiRootSections, WikiRootSectionQueryType } from '../../queries/wiki'
import PageContent from '../UI/PageContent'
import MainMenuItem from './MainMenuItem'
import QrWiFi from './QrWiFi'
import Search from './Search'
import PageHeader from '../UI/PageHeader'

export default function WikiPage() {
  // Get wiki root sections
  const { data: sections, loading } = useQuery<WikiRootSectionQueryType>(getWikiRootSections)

  // Get all wiki paths
  const { data } = useQuery(getPaths)

  return (
    <>
      <PageHeader title="Wiki" extra={[<Search />]} />
      <PageContent loading={loading}>
        {sections?.wikiRootSections.map((section, i) => (
          <MainMenuItem
            key={i}
            section={section}
            paths={
              data?.wikiPagesPaths.filter((path: string) => path.startsWith(section.path)) || []
            }
          />
        ))}
        <QrWiFi />
      </PageContent>
    </>
  )
}
