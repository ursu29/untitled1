import { useMutation } from "@apollo/client";
import React from 'react'
import message from '../../message'
import { Guild } from '../../types'
import { getGuild, updateGuild } from '../../queries/guilds'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import GuildForm from './GuildForm'

function UpdateGuild({ guild }: { guild: Partial<Guild> }) {
  const [update, { loading }] = useMutation(updateGuild, {
    onCompleted: () => message.success('Guild has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: getGuild, variables: { input: { azureDisplayName: guild.azureDisplayName } } },
    ],
    onError: message.error,
  })

  return (
    <Drawer
      toggler={<Button type="link">Edit</Button>}
      drawerLabel={'Edit guild ' + guild?.title}
      content={
        <GuildForm
          loading={loading}
          item={guild}
          onSubmit={async (guild: Partial<Guild>) => {
            update({ variables: { input: guild } })
          }}
        />
      }
    />
  )
}

export default UpdateGuild
