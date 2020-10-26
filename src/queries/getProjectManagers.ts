import gql from 'graphql-tag'
import { Project, Employee } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectManagers($id: ID!) {
    project(id: $id) {
      id
      scrumMasters {
        ...EmployeeDetails
        avatar
      }
      employees {
        id
        agileManager {
          ...EmployeeDetails
          avatar
        }
      }
    }
  }
  ${fragments.Employee.Details}
`
type EmployeePick = EmployeeDetails & { avatar: Employee['avatar'] }

type ProjectPick = Pick<Project, 'id'> & {
  employees: (Pick<Employee, 'id'> & { agileManager: EmployeePick | null })[]
  scrumMasters: EmployeePick[] | null
}

export type QueryType = {
  project: ProjectPick
}
