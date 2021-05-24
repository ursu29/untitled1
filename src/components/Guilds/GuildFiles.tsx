import React from 'react'
import message from '../../message'
import { useSharedFilesQuery } from '../../queries/getSharedFiles'
import { Guild } from '../../types'
import SharedFileList from '../Files/SharedFileList'

interface Props {
  guild: Guild
}

export default function GuildFiles({ guild }: Props) {
  const skills = guild.skills?.map(skill => skill.id)
  const { data, loading } = useSharedFilesQuery({
    variables: { input: { skills } },
    skip: !skills.length,
    onError: message.error,
  })
  const files = data?.sharedFiles || []

  if (!guild) return <div>Guild is not found</div>

  return <SharedFileList loading={loading} files={files} />
}
