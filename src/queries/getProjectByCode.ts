import { gql } from '@apollo/client'
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

export type ProjectPick = ProjectDetails & {
  scrumMasters: EmployeePick[]
  projectsOccupancy?: Array<{ id: Employee['id']; capacity: number; isExtraCapacity?: boolean }>
}

export type QueryType = {
  projectByCode: ProjectPick
}
