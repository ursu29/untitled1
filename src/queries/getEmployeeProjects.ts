import gql from 'graphql-tag'
import { Employee, Project, ID } from '../types'

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

type EmployeePick = {
  id: Employee['id']
  projects: ProjectPick[]
}

export type GetEmployeeProjectsQuery = {
  employee: EmployeePick
}

export type GetEmployeeProjectsVariables = {
  id: ID
}

export default gql`
  query getEmployeeProjects($id: ID!) {
    employee(id: $id) {
      id
      projects {
        id
        name
        code
      }
    }
  }
`