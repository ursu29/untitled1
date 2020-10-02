import React from 'react'
import { Project } from '../../types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ProjectView from './Project'
import ProjectManagers from '../UI/ProjectManagers'
import ProjectTechnologies from './ProjectTechnologies'
import query, { QueryType } from '../../queries/getProject'

interface Props {
  project: Pick<Project, 'id'>
}

export default function ProjectDetails(props: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { id: props.project.id },
  })
  const project = data?.project
  return (
    <>
      <ProjectView
        loading={loading}
        project={project}
        managers={<ProjectManagers project={{ id: props.project.id }} />}
      />
      <ProjectTechnologies project={props.project} />
    </>
  )
}
