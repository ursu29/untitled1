import gql from 'graphql-tag'
import fragments, { ProjectDetails } from '../fragments'

export default gql`
  {
    projects {
      ...ProjectDetails
    }
  }
  ${fragments.Project}
`

export type QueryType = {
  projects: ProjectDetails[]
}
