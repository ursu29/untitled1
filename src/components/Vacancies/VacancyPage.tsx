import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import Vacancy from './Vacancy'
import Controls from '../UI/Controls'
import Back from '../UI/Back'

function VacancyPage({ match }: RouteComponentProps<{ id: string }>) {
  return (
    <PageContent>
      <Controls back={<Back />} />
      <Vacancy id={match.params.id} editable={false} />
    </PageContent>
  )
}

export default withRouter(VacancyPage)
