import React from 'react'
import { Employee } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import getEmployeeProjects, {
  GetEmployeeProjectsQuery,
  GetEmployeeProjectsVariables,
} from '../../queries/getEmployeeProjects'
import ProjectTagList from '../Projects/ProjectTagList'
import Section from '../UI/Section'
import Skeleton from '../UI/Skeleton'

interface Props {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeProjects(props: Props) {
  const { data, loading, error } = useQuery<GetEmployeeProjectsQuery, GetEmployeeProjectsVariables>(
    getEmployeeProjects,
    {
      variables: { input: { id: props.employee?.id } },
      skip: !props.employee,
    },
  )

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const projects = data?.employees?.[0]?.projects
  const leadingProjects = data?.employees?.[0]?.leadingProjects

  return (
    <Skeleton loading={loading} active line>
      {projects && projects?.length > 0 && (
        <Section title="Projects">
          <ProjectTagList small projects={projects} leadingProjects={leadingProjects} />
        </Section>
      )}
    </Skeleton>
  )
}
