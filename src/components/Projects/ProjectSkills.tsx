import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import query, { QueryType } from '../../queries/getProjectEmployeesExperiences'
import { Project } from '../../types'
import ProjectSkillsTable from '../UI/ProjectSkillsTable'
import Skeleton from '../UI/Skeleton'
import message from '../../message'

interface Props {
  project: Pick<Project, 'id'>
}

export default (props: Props) => {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { input: { id: props.project.id } },
    onError: message.error,
  })

  const project = data?.projects[0]

  return (
    <Skeleton active loading={loading}>
      {project && <ProjectSkillsTable project={project} />}
      {!project && <div>Project is not found</div>}
    </Skeleton>
  )
}
