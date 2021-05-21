import React from 'react'
import { Skill } from '../../types'
import { useSharedFilesQuery } from '../../queries/getSharedFiles'
import SharedFileList from '../Files/SharedFileList'
import message from '../../message'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function SkillFiles({ skill }: Props) {
  const skills = skill ? [skill.id] : []
  const { data, loading } = useSharedFilesQuery({
    variables: { input: { skills } },
    skip: !skill,
    onError: message.error,
  })
  const files = data?.sharedFiles || []

  if (!skill) return <div>Skill is not found</div>

  return <SharedFileList loading={loading} files={files} />
}
