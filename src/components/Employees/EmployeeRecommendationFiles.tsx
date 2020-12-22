import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Skill } from '../../types'
import message from '../../message'
import getSharedFiles, { QueryType } from '../../queries/getSharedFiles'
import SharedFileList from '../Files/SharedFileList'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

export default function EmployeeRecommendationFiles({ skills }: Props) {
  const skillIds = skills?.map(skill => skill.id) || []
  const variables = { input: { skills: skillIds } }
  const { data, loading, startPolling, stopPolling } = useQuery<QueryType>(getSharedFiles, {
    variables,
    skip: !skillIds.length,
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

  return <SharedFileList loading={loading} hasMore={hasMore} files={files} />
}
