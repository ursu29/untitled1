import { gql } from "@apollo/client";
import { Project, EmployeeProject } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectEmployees($id: ID!) {
    project(id: $id) {
      id
      employees {
        ...EmployeeDetails
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
  }
  ${fragments.Employee.Details}
`

type ProjectPick = Pick<Project, 'id'> & {
  employees: (EmployeeDetails & { employeeProjects?: EmployeeProject[] })[]
}

export type QueryType = {
  project: ProjectPick
}
