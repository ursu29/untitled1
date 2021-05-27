import { gql } from '@apollo/client'
import { Employee, Project, ID, EmployeeProject } from '../types'

type ProjectPick = Pick<Project, 'id' | 'name' | 'code'>

type EmployeePick = {
  id: Employee['id']
  projects: ProjectPick[]
  employeeProjects?: EmployeeProject[]
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
      employeeProjects {
        id
        capacity
        isExtraCapacity
        project {
          id
        }
      }
    }
  }
`
