import { useQuery } from '@apollo/client'
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import { getGuild, GuildQueryType } from '../../queries/guilds'
import GuildTabs from './GuildTabs'
import UpdateGuild from './UpdateGuild'
import PageHeader from '../UI/PageHeader'
import Helmet from '../Helmet'

interface Props extends RouteComponentProps<{ code: string; tab?: string }> {}
function GuildPage({ match }: Props) {
  const { code: azureDisplayName, tab } = match.params
  const variables = { input: { azureDisplayName } }

  // Get guild
  const { data, loading, error } = useQuery<GuildQueryType>(getGuild, {
    variables,
  })

  const guild = data?.guild

  return (
    <>
      <Helmet title={guild?.title} />
      <PageHeader
        title={guild?.title}
        withBack
        extra={[guild && guild.accessWrite && <UpdateGuild guild={guild} />]}
      />
      <PageContent
        error={error}
        loading={loading}
        notFound={!data?.guild}
        notFoundMessage="Sorry, that guild was not found"
      >
        {guild && <GuildTabs guild={guild} tab={tab} />}
      </PageContent>
    </>
  )
}

export default withRouter(GuildPage)
