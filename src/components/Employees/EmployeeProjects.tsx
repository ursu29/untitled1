import React from 'react'
import { Employee, Project } from '../../types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ProjectTagList from '../UI/ProjectTagList'

interface Props {
  employee?: Pick<Employee, 'id'>
}

const query = gql`
  query GetEmployeeProjects($input: EmployeesInput) {
    employees(input: $input) {
      id
      leadingProjects {
        id
        name
        code
      }
      projects {
        id
        name
        code
      }
    }
  }
`

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

export default function EmployeeProjects(props: Props) {
  const { data, loading, error } = useQuery<{
    employees: { id: Employee['id']; leadingProjects: ProjectPick[]; projects: ProjectPick[] }[]
  }>(query, {
    variables: { input: { id: props.employee?.id } },
    skip: !props.employee,
  })

  if (!props.employee) return null

  if (error) return <div>Error :(</div>

  const projects = data?.employees?.[0]?.projects
  // const leadingProjects = data?.employees?.[0]?.projects

  return <ProjectTagList loading={loading} projects={projects} />
}
