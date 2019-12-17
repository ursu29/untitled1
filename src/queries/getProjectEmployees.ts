import gql from 'graphql-tag'
import { Project } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectEmployees($input: ProjectsInput) {
    projects(input: $input) {
      id
      employees {
        ...EmployeeDetails
      }
    }
  }
  ${fragments.Employee.Details}
`

type ProjectPick = Pick<Project, 'id'> & {
  employees: EmployeeDetails[]
}

export type QueryType = {
  projects: ProjectPick[]
}
