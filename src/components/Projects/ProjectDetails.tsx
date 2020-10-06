import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import query, { QueryType } from '../../queries/getProject'
import { Project } from '../../types'
import ProjectManagers from '../UI/ProjectManagers'
import ProjectView from './Project'
import ProjectTechnologies from './ProjectTechnologies'

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
