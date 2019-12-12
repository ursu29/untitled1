import React from 'react'
import { Project } from '../../types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ProjectView from '../UI/Project'

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
  const { data, loading, error } = useQuery<{ projects: ProjectPick[] }>(query, {
    variables: { input: { id: props.project.id } },
  })
  const project = data?.projects?.[0]
  return <ProjectView loading={loading} project={project} />
}
