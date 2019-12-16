import React from 'react'
import PageContent from '../UI/PageContent'
import SkillsTree from './SkillsTree'
import CreateSkill from './CreateSkill'
import Controls from '../UI/Controls'

export default function SkillsPage() {
  return (
    <PageContent>
      <Controls>
        <CreateSkill />
      </Controls>
      <SkillsTree />
    </PageContent>
  )
}
