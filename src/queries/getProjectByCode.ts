import gql from 'graphql-tag'
import fragments, { ProjectDetails } from '../fragments'
import { Employee } from '../types'

export default gql`
  query getProjectByCode($code: String!) {
    projectByCode(code: $code) {
      ...ProjectDetails
      scrumMasters {
        id
        email
      }
    }
  }
  ${fragments.Project}
`

type EmployeePick = Pick<Employee, 'id' | 'email'>

type ProjectPick = ProjectDetails & {
  scrumMasters: EmployeePick[]
}

export type QueryType = {
  projectByCode: ProjectPick
}
