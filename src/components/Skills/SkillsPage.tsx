import React from 'react'
import PageContent from '../UI/PageContent'
import SkillsTree from './SkillsTree'
import CreateSkill from './CreateSkill'

export default function SkillsPage() {
  return (
    <PageContent>
      <CreateSkill />
      <SkillsTree />
    </PageContent>
  )
}
