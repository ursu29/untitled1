import gql from 'graphql-tag'
import { Project } from '../types'
import fragments, { SkillDetails } from '../fragments'

export default gql`
  query getProjectSkills($input: ProjectsInput) {
    projects(input: $input) {
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
  projects: ProjectPick[]
}
