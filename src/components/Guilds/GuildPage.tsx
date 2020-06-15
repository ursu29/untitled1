import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useMediaQuery } from 'react-responsive'
import GuildTitle from './GuildTitle'
import GuildDescription from './GuildDescription'
import GuildShortDescription from './GuildShortDescription'
import Technologies from './Technologies'
import { MainContent, LeftBlock, RightBlock } from './styled'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import PageContent from '../UI/PageContent'
import ProjectManagers from '../UI/ProjectManagers'
import { getGuild, GuildQueryType, updateGuild } from '../../queries/guilds'
import message from '../../message'

interface Props extends RouteComponentProps<{ code: string }> {}

function GuildPage({ match }: Props) {
  const { code: azureDisplayName } = match.params
  const singleColumn = useMediaQuery({ maxWidth: 820 })
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

  const guild = data?.guild || {
    id: '',
    title: '',
    description: '',
    shortDescription: '',
    skills: [],
    azureId: '',
    accessWrite: false,
  }

  const editable = guild.accessWrite

  const handleSave = (value: any) => {
    update({ variables: { input: { azureDisplayName, ...value } } })
  }

  return (
    <PageContent
      error={error}
      loading={loading}
      notFound={!data?.guild}
      notFoundMessage="Sorry, that guild was not found"
    >
      <Controls back={<Back />} />

      <GuildTitle title={guild.title} editable={editable} handleSave={handleSave} />

      <MainContent singleColumn={singleColumn}>
        <LeftBlock singleColumn={singleColumn}>
          {editable && (
            <GuildShortDescription description={guild.shortDescription} handleSave={handleSave} />
          )}
          <GuildDescription
            description={guild.description}
            editable={editable}
            handleSave={handleSave}
          />
          <Technologies technologies={guild.skills} editable={editable} handleSave={handleSave} />
        </LeftBlock>

        <RightBlock singleColumn={singleColumn}>
          <ProjectManagers project={{ id: guild.azureId }} title="Guild Lead" />
        </RightBlock>
      </MainContent>
    </PageContent>
  )
}

export default withRouter(GuildPage)
