import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import paths from '../../paths'
import Back from '../UI/Back'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import SkillDetails from './SkillDetails'
import SkillTabs from './SkillTabs'
import URLAction from '../../utils/URLAction'

interface Props extends RouteComponentProps<{ id: string; tab: string }> {}

function ProjectPage({ match }: Props) {
  const { id } = match.params
  const urlAction = new URLAction()

  return (
    <>
      <PageContent>
        <Controls back={<Back goto={paths.SKILLS} />} />
        <SkillDetails skill={{ id }} />
      </PageContent>
      <SkillTabs key={id} skill={{ id }} tab={urlAction.paramsGet('tab') || ''} />
    </>
  )
}

export default withRouter(ProjectPage)
