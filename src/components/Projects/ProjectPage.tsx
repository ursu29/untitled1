import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Project } from '../../types'
import Skeleton from '../UI/Skeleton'
import ProjectDetails from './ProjectDetails'
import ProjectTabs from './ProjectTabs'

interface Props extends RouteComponentProps<{ code: string; tab: string }> {}

const query = gql`
  query getPRojects($input: ProjectsInput) {
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
      <ProjectDetails project={project} />
      <ProjectTabs project={project} tab={tab} />
    </Skeleton>
  )
}

export default withRouter(ProjectPage)
