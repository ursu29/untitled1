import React from 'react'
import PageContent from '../UI/PageContent'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function ProcessPage({ match }: RouteComponentProps<{ id: string }>) {
  const id = match.params.id
  return <PageContent>Process page {id}</PageContent>
}

export default withRouter(ProcessPage)
