import { useQuery, useMutation } from '@apollo/client'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Row, Col } from 'antd'
import GuildCard from './GuildCard'
import PageContent from '../UI/PageContent'
import { getGuilds, GuildsQueryType } from '../../queries/guilds'
import { getWikiPage, WikiPageQueryType, updateWikiPage } from '../../queries/wiki'
import MarkdownEditable from '../UI/MarkdownEditable'
import message from '../../message'
import PageScheme from '../Wiki/PageScheme'
import { getPaths } from '../../queries/wiki'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageHeader from '../UI/PageHeader'
import Helmet from '../Helmet'

export default function GuildsPage() {
  const isGridToSingleColumn = useMediaQuery({ maxWidth: 820 })

  // Get guilds
  const { data, loading, error } = useQuery<GuildsQueryType>(getGuilds)

  const guilds = data?.guilds

  // Making two-column grid from original list
  const guildsGrid: any = []
  guilds?.forEach((guild, i) => {
    if (i % 2 === 0) {
      guildsGrid.push({
        col1: guild,
      })
    } else {
      guildsGrid[guildsGrid.length - 1].col2 = guild
    }
  })

  const variables = { input: { path: '/guilds-info' } }

  // Get page
  const { data: guildsInfo } = useQuery<WikiPageQueryType>(getWikiPage, {
    variables,
  })

  // Update page
  const [update] = useMutation(updateWikiPage, {
    onCompleted: () => message.success('Page has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getWikiPage, variables }],
    onError: message.error,
  })
  const handleSave = (value: any) => {
    update({ variables: { input: { id: guildsInfo?.wikiPage?.id, ...value } } })
  }

  // Show single or two-column grid depends on the screen width
  const GuildsDisplay = () => (
    <>
      {!isGridToSingleColumn
        ? guildsGrid.map((guildRow: any) => (
            <Row key={guildRow.col1.id} style={{ marginBottom: '30px' }}>
              {guildRow.col1 && (
                <Col span={12}>
                  {<GuildCard guild={guildRow.col1} style={{ marginRight: '15px' }} />}
                </Col>
              )}
              {guildRow.col2 && (
                <Col span={12}>
                  {<GuildCard guild={guildRow.col2} style={{ marginLeft: '15px' }} />}
                </Col>
              )}
            </Row>
          ))
        : guilds?.map(guildRow => (
            <Row key={guildRow.id} style={{ marginBottom: '30px' }}>
              <Col span={24}>{<GuildCard guild={guildRow} />}</Col>
            </Row>
          ))}
    </>
  )

  // Get guilds-info wiki paths
  const { data: guildsInfoPaths } = useQuery(getPaths, { variables: { rootPath: '/guilds-info' } })

  const guildsInfoSection = '/guilds-info'

  const writeAccess = useStrapiGroupCheck('TECH_PORTAL')

  return (
    <>
      <Helmet title="Guilds" />
      <PageHeader title="Guilds" />
      <PageContent
        error={error}
        loading={loading}
        notFound={!data?.guilds}
        notFoundMessage="Sorry, guilds were not found"
      >
        {writeAccess && (
          <div style={{ maxWidth: '700px', marginBottom: '30px' }}>
            <p style={{ marginBottom: '5px', fontStyle: 'italic' }}>
              You have access to change the structure of guild pages
            </p>
            <PageScheme
              paths={
                guildsInfoPaths?.wikiPagesPaths.filter((path: string) =>
                  path.startsWith(guildsInfoSection),
                ) || []
              }
              sectionPath={guildsInfoSection}
              rootPath="/guilds-info"
            />
          </div>
        )}

        <div style={{ maxWidth: '600px' }}>
          <MarkdownEditable
            data={guildsInfo?.wikiPage?.body || ''}
            editable={writeAccess}
            handleSave={(data: string) => handleSave({ body: data })}
          />
        </div>

        <GuildsDisplay />
      </PageContent>
    </>
  )
}
