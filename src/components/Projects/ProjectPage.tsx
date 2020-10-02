import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Project } from '../../types'
import Skeleton from '../UI/Skeleton'
import ProjectDetails from './ProjectDetails'
import ProjectTabs from './ProjectTabs'
import Controls from '../UI/Controls'
import Back from '../UI/Back'
import paths from '../../paths'
import PageContent from '../UI/PageContent'
import CreateSchemaExtention from './CreateSchemaExtention'

interface Props extends RouteComponentProps<{ code: string; tab: string }> {}

const query = gql`
  query getProjects($input: ProjectsInput) {
    projects(input: $input) {
      id
    }
  }
`

function ProjectPage({ match }: Props) {
  const { code, tab } = match.params
  const { data, loading, error } = useQuery<{ projects: Pick<Project, 'id'>[] }>(query, {
    variables: { input: { code } },
  })

  if (error) return <div>Error :(</div>

  if (!data) return null

  const project = data?.projects?.[0]

  if (!project) return <div>Project is not found</div>

  return (
    <Skeleton loading={loading || !data}>
      <PageContent>
        <Controls back={<Back goto={paths.PROJECTS} />}>
          <CreateSchemaExtention project={project} />
        </Controls>
        <ProjectDetails project={project} />
      </PageContent>
      <ProjectTabs project={project} tab={tab} />
    </Skeleton>
  )
}

export default withRouter(ProjectPage)
