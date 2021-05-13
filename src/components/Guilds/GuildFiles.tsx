import { useQuery } from "@apollo/client";
import React, { useEffect } from 'react'
import { Guild } from '../../types'
import getSharedFiles, { QueryType } from '../../queries/getSharedFiles'
import message from '../../message'
import SharedFileList from '../Files/SharedFileList'

interface Props {
  guild: Guild
}

export default function GuildFiles({ guild }: Props) {
  const skills = guild.skills?.map(skill => skill.id) || []
  const variables = { input: { skills } }
  const { data, loading, startPolling, stopPolling } = useQuery<QueryType>(getSharedFiles, {
    variables,
    skip: !skills.length,
    onError: message.error,
  })
  const hasMore = data?.sharedFiles.hasMore || false
  const files = data?.sharedFiles.files || []

  useEffect(() => {
    if (hasMore) {
      startPolling(5000)
      return () => stopPolling()
    }
  }, [hasMore, startPolling, stopPolling])

  if (!guild) return <div>Guild is not found</div>

  return <SharedFileList loading={loading} hasMore={hasMore} files={files} />
}
