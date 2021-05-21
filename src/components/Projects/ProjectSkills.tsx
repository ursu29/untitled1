import { useQuery } from '@apollo/client'
import * as React from 'react'
import query, { QueryType } from '../../queries/getProjectEmployeesExperiences'
import { Project } from '../../types'
import ProjectSkillsTable from './ProjectSkillsTable'
import Skeleton from '../UI/Skeleton'
import message from '../../message'

interface Props {
  project: Pick<Project, 'id'>
}

export default function ProjectSkills(props: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { id: props.project.id },
    onError: message.error,
  })

  const project = data?.project

  return (
    <Skeleton active loading={loading}>
      {project && <ProjectSkillsTable project={project} />}
      {!project && <div>Project is not found</div>}
    </Skeleton>
  )
}
