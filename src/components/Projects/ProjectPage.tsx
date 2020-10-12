import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import paths from '../../paths'
import query, { QueryType } from '../../queries/getProjectByCode'
import Back from '../UI/Back'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import CreateSchemaExtention from './CreateSchemaExtention'
import Project from './Project'
import ProjectTabs from './ProjectTabs'
import ProjectTechnologies from './ProjectTechnologies'

interface Props extends RouteComponentProps<{ code: string; tab: string }> {}

function ProjectPage({ match }: Props) {
  const { code, tab } = match.params
  const { data, loading, error } = useQuery<QueryType>(query, { variables: { code } })

  if (error) return <div>Error :(</div>
  if (!data) return null

  const project = data?.projectByCode
  if (!project) return <div>Project is not found</div>

  return (
    <Skeleton loading={loading || !data}>
      <PageContent>
        <Controls back={<Back goto={paths.PROJECTS} />}>
          <CreateSchemaExtention project={project} />
        </Controls>
        <Project loading={loading} project={project} />
        <ProjectTechnologies project={project} />
      </PageContent>
      <ProjectTabs project={project} tab={tab} />
    </Skeleton>
  )
}

export default withRouter(ProjectPage)
