import gql from 'graphql-tag'
import { Project } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProjectEmployees($id: ID!) {
    project(id: $id) {
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
  project: ProjectPick
}
