import gql from 'graphql-tag'
import { Project } from '../types'

export default gql`
  {
    projects {
      id
      name
      code
      description
    }
  }
`

type ProjectPick = Pick<Project, 'id' | 'name' | 'code' | 'description'>

export type QueryType = {
  projects: ProjectPick[]
}
