import { gql } from '@apollo/client'
import fragments, { ProjectDetails } from '../fragments'

export default gql`
  query getProjects {
    projects {
      ...ProjectDetails
    }
  }
  ${fragments.Project}
`

export type QueryType = {
  projects: ProjectDetails[]
}
