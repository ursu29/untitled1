import { gql } from '@apollo/client'
import { Project } from '../types'
import fragments, { SkillDetails } from '../fragments'

export default gql`
  query getProjectSkills($id: ID!) {
    project(id: $id) {
      id
      skills {
        ...SkillDetails
      }
      access {
        read
        write
      }
    }
  }
  ${fragments.Skill.Details}
`

type ProjectPick = Pick<Project, 'id' | 'access'> & {
  skills: SkillDetails[]
}

export type QueryType = {
  project: ProjectPick
}
