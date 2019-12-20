import React from 'react'
import { Project } from '../../types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ProjectView from '../UI/Project'
import ProjectManagers from './ProjectManagers'
import ProjectTechnologies from './ProjectTechnologies'
interface Props {
  project: Pick<Project, 'id'>
}

const query = gql`
  query getProject($input: ProjectsInput) {
    projects(input: $input) {
      id
      name
      code
      description
    }
  }
`

type ProjectPick = Pick<Project, 'id' | 'name' | 'code' | 'description'>

export default function ProjectDetails(props: Props) {
  const input = { id: props.project.id }
  const { data, loading } = useQuery<{ projects: ProjectPick[] }>(query, {
    variables: { input },
  })
  const project = data?.projects?.[0]
  return (
    <>
      <ProjectView
        loading={loading}
        project={project}
        managers={<ProjectManagers project={input} />}
      />
      <ProjectTechnologies project={props.project} />
    </>
  )
}
