import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import query, { QueryType } from '../../queries/getProjectEmployeesExperiences'
import { Project } from '../../types'
import ProjectSkillsTable from '../UI/ProjectSkillsTable'
import Skeleton from '../UI/Skeleton'

interface Props {
  project: Pick<Project, 'id'>
}

export default (props: Props) => {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { input: { id: props.project.id } },
  })

  const project = data?.projects[0]

  return (
    <Skeleton active loading={loading}>
      {project && <ProjectSkillsTable project={project} />}
      {!project && <div>Project is not found</div>}
    </Skeleton>
  )
}
