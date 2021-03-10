import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useMediaQuery } from 'react-responsive'
import message from '../../message'
import { getGuild, updateGuild } from '../../queries/guilds'
import { Guild } from '../../types'
import MarkdownEditable from '../UI/MarkdownEditable'
import Technologies from '../UI/Technologies'
import ProjectManagers from '../Projects/ProjectManagers'
import GuildShortDescription from './GuildShortDescription'
import { LeftBlock, MainContent, RightBlock } from './styled'

interface Props {
  guild: Guild
}

function GuildInfo({ guild }: Props) {
  const singleColumn = useMediaQuery({ maxWidth: 820 })
  const variables = { input: { azureDisplayName: guild.azureDisplayName } }

  // Update guild
  const [update] = useMutation(updateGuild, {
    onCompleted: () => message.success('Guild has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getGuild, variables }],
    onError: message.error,
  })

  const editable = guild.accessWrite

  const handleSave = (value: any) => {
    update({ variables: { input: { azureDisplayName: guild.azureDisplayName, ...value } } })
  }

  return (
    <>
      <MainContent singleColumn={singleColumn}>
        <LeftBlock singleColumn={singleColumn}>
          {editable && (
            <GuildShortDescription description={guild.shortDescription} handleSave={handleSave} />
          )}
          <MarkdownEditable
            data={guild.description}
            editable={editable}
            handleSave={(data: string) => handleSave({ description: data })}
          />
          <Technologies
            technologies={guild.skills}
            editable={editable}
            handleSave={handleSave}
            isTitleShown
          />
        </LeftBlock>
        <RightBlock singleColumn={singleColumn}>
          <ProjectManagers
            project={{ id: guild.id }}
            title="Guild Leads"
            managers={guild.leaders}
          />
        </RightBlock>
      </MainContent>
    </>
  )
}

export default GuildInfo
