import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useQuery } from '@apollo/react-hooks'
import { Typography, Row, Col } from 'antd'
import GuildCard from './GuildCard'
import PageContent from '../UI/PageContent'
import { getGuilds, GuildsQueryType } from '../../queries/guilds'

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

  return (
    <PageContent
      error={error}
      loading={loading}
      notFound={!data?.guilds}
      notFoundMessage="Sorry, guilds were not found"
    >
      <Typography.Title style={{ marginBottom: '40px' }}>Guilds</Typography.Title>
      <GuildsDisplay />
    </PageContent>
  )
}
