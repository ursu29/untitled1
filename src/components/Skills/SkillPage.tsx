import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import SkillDetails from './SkillDetails'
import SkillTabs from './SkillTabs'

interface Props extends RouteComponentProps<{ id: string; tab: string }> {}

function ProjectPage({ match }: Props) {
  const { id, tab } = match.params

  return (
    <>
      <SkillDetails skill={{ id }} />
      <SkillTabs skill={{ id }} tab={tab} />
    </>
  )
}

export default withRouter(ProjectPage)
