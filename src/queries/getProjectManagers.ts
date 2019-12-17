import gql from 'graphql-tag'
import { Project, Employee } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectManagers($input: ProjectsInput) {
    projects(input: $input) {
      id
      leaders {
        ...EmployeeDetails
        avatar
      }
    }
  }
  ${fragments.Employee.Details}
`

type ProjectPick = Pick<Project, 'id'> & {
  leaders: (EmployeeDetails & { avatar: Employee['avatar'] })[]
}

export type QueryType = {
  projects: ProjectPick[]
}
