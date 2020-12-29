import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import paths from '../../paths'
import Back from '../UI/Back'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import SkillDetails from './SkillDetails'
import SkillTabs from './SkillTabs'

interface Props extends RouteComponentProps<{ id: string; tab: string }> {}

function ProjectPage({ match }: Props) {
  const { id, tab } = match.params

  return (
    <>
      <PageContent>
        <Controls back={<Back goto={paths.SKILLS} />} />
        <SkillDetails skill={{ id }} />
      </PageContent>
      <SkillTabs key={id} skill={{ id }} tab={tab} />
    </>
  )
}

export default withRouter(ProjectPage)
