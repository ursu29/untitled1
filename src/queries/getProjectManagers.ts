import { gql } from '@apollo/client'
import { Project, Employee } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectManagers($id: ID!) {
    project(id: $id) {
      id
      scrumMasters {
        ...EmployeeDetails
      }
      employees {
        id
        agileManager {
          ...EmployeeDetails
        }
      }
    }
  }
  ${fragments.Employee.Details}
`
type EmployeePick = Pick<Employee, 'id'> & { agileManager: EmployeeDetails | null }

type ProjectPick = Pick<Project, 'id'> & {
  employees: EmployeePick[]
  scrumMasters: EmployeeDetails[] | null
}

export type QueryType = {
  project: ProjectPick
}
