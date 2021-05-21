import React from 'react'
import { Skill } from '../../types'
import message from '../../message'
import { useSharedFilesQuery } from '../../queries/getSharedFiles'
import SharedFileList from '../Files/SharedFileList'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

export default function EmployeeRecommendationFiles({ skills }: Props) {
  const skillIds = skills?.map(skill => skill.id) || []
  const { data, loading } = useSharedFilesQuery({
    variables: { input: { skills: skillIds } },
    skip: !skillIds.length,
    onError: message.error,
  })
  const files = data?.sharedFiles || []

  return <SharedFileList loading={loading} files={files} />
}
