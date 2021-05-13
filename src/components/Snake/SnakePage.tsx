import React, { useMemo } from 'react'
import { Tabs } from 'antd'
import message from '../../message'
import { useGetGameLeaderboardQuery, GetGameLeaderboardDocument } from '../../queries/games'
import { GameType } from '../../types/graphql'
import PageContent from '../UI/PageContent'
import SnakeGame from './SnakeGame'
import Leaderboard from './Leaderboard'
import PageHeader from '../UI/PageHeader'

const { TabPane } = Tabs

const SnakePage = () => {
  const variables = {
    input: { game: GameType.Snake },
  }
  const { data, loading, error } = useGetGameLeaderboardQuery({
    onError: message.error,
    variables,
  })
  const refetchLeaderboardQuery = { query: GetGameLeaderboardDocument, variables }

  // eslint-disable-next-line
  const leaderboards = data?.gameLeaderboard || []
  const highScore = useMemo(() => Math.max(...leaderboards.map(({ score }) => score)), [
    leaderboards,
  ])

  return (
    <>
      <PageHeader title="Games" withoutDivider />
      <PageContent
        error={error}
        loading={loading}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '95%',
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: '-32px',
        }}
      >
        <Tabs style={{ padding: '0 30px', height: '100%' }}>
          <TabPane tab="Snake" key="snake">
            <SnakeGame highScore={highScore} refetchQueries={[refetchLeaderboardQuery]} />
          </TabPane>
          <TabPane tab="Leaderboard" key="leaderboard">
            <Leaderboard leaderboards={leaderboards} loading={loading} />
          </TabPane>
        </Tabs>
      </PageContent>
    </>
  )
}

export default SnakePage
