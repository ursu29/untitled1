import gql from 'graphql-tag'
import { Employee, Project } from '../types'

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

type EmployeePick = {
  id: Employee['id']
  leadingProjects: ProjectPick[]
  projects: ProjectPick[]
}

export type GetEmployeeProjectsQuery = {
  employees: EmployeePick[]
}

export type GetEmployeeProjectsVariables = {
  input: {
    id?: string
  }
}

export default gql`
  query getEmployeeProjects($input: EmployeesInput) {
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
