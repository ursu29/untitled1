import { useQuery } from "@apollo/client";
import React, { useEffect } from 'react'
import { Skill } from '../../types'
import getSharedFiles, { QueryType } from '../../queries/getSharedFiles'
import SharedFileList from '../Files/SharedFileList'
import message from '../../message'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function SkillFiles({ skill }: Props) {
  const variables = { input: { skills: [skill?.id] } }
  const { data, loading, startPolling, stopPolling } = useQuery<QueryType>(getSharedFiles, {
    variables,
    skip: !skill,
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

  if (!skill) return <div>Skill is not found</div>

  return <SharedFileList loading={loading} hasMore={hasMore} files={files} />
}
