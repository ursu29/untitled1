import { useQuery } from '@apollo/client'
import { Typography } from 'antd'
import React from 'react'
import getEmployeeProjects, {
  GetEmployeeProjectsQuery,
  GetEmployeeProjectsVariables,
} from '../../queries/getEmployeeProjects'
import { Employee } from '../../types'
import ProjectTagList from '../Projects/ProjectTagList'
import Skeleton from '../UI/Skeleton'

interface Props {
  employee: Pick<Employee, 'id'>
}

export default function EmployeeProjects(props: Props) {
  const { data, loading, error } = useQuery<GetEmployeeProjectsQuery, GetEmployeeProjectsVariables>(
    getEmployeeProjects,
    {
      variables: { id: props.employee.id },
      skip: !props.employee,
    },
  )

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const projects = data?.employee.projects
  const employeeProjects = data?.employee.employeeProjects

  return (
    <Skeleton loading={loading} active line>
      {projects && projects?.length > 0 && (
        <>
          <Typography.Title level={4} data-cy="projects">
            Projects
          </Typography.Title>
          <ProjectTagList small projects={projects} employeeProjects={employeeProjects} />
        </>
      )}
    </Skeleton>
  )
}
