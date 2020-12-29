import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import TitleEditable from '../UI/TitleEditable'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import PageContent from '../UI/PageContent'
import { getGuild, GuildQueryType, updateGuild } from '../../queries/guilds'
import message from '../../message'
import GuildTabs from './GuildTabs'

interface Props extends RouteComponentProps<{ code: string; tab?: string }> {}

function GuildPage({ match }: Props) {
  const { code: azureDisplayName, tab } = match.params
  const variables = { input: { azureDisplayName } }

  // Get guild
  const { data, loading, error } = useQuery<GuildQueryType>(getGuild, {
    variables,
  })

  // Update guild
  const [update] = useMutation(updateGuild, {
    onCompleted: () => message.success('Guild has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getGuild, variables }],
    onError: message.error,
  })

  const guild = data?.guild

  const handleSave = (title: string) => {
    update({ variables: { input: { azureDisplayName, title } } })
  }

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

          <TitleEditable
            data={guild.title}
            editable={guild.accessWrite}
            handleSave={handleSave}
            emptyValue="(untitled)"
          />

          <GuildTabs guild={guild} tab={tab} />
        </>
      )}
    </PageContent>
  )
}

export default withRouter(GuildPage)
