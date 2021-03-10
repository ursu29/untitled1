import React from 'react'
import { Typography } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import PageContent from '../UI/PageContent'
import { getGuild, GuildQueryType } from '../../queries/guilds'
import GuildTabs from './GuildTabs'
import UpdateGuild from './UpdateGuild'

interface Props extends RouteComponentProps<{ code: string; tab?: string }> {}
const { Title } = Typography

function GuildPage({ match }: Props) {
  const { code: azureDisplayName, tab } = match.params
  const variables = { input: { azureDisplayName } }

  // Get guild
  const { data, loading, error } = useQuery<GuildQueryType>(getGuild, {
    variables,
  })

  const guild = data?.guild

  return (
    <PageContent
      error={error}
      loading={loading}
      notFound={!data?.guild}
      notFoundMessage="Sorry, that guild was not found"
    >
      {guild && (
        <>
          <Controls back={<Back />} />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title>{guild.title}</Title>
            {guild.accessWrite && <UpdateGuild guild={guild} />}
          </div>

          <GuildTabs guild={guild} tab={tab} />
        </>
      )}
    </PageContent>
  )
}

export default withRouter(GuildPage)
