import gql from 'graphql-tag'
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
