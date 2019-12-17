import gql from 'graphql-tag'
import { Project, Employee, Skill } from '../types'
import fragments, { ExperienceDetails } from '../fragments'

export default gql`
  query getProjectEmployeesExperiences($input: ProjectsInput) {
    projects(input: $input) {
      id
      skills {
        id
        name
      }
      employees {
        id
        name
        email
        position
        experiences {
          ...ExperienceDetails
        }
      }
    }
  }
  ${fragments.Experience.Details}
`

type ProjectPick = Pick<Project, 'id'> & {
  skills: Pick<Skill, 'id' | 'name'>[]
  employees: Pick<Employee, 'id' | 'name' | 'email' | 'position'> & {
    experiences: ExperienceDetails[]
  }
}

export type QueryType = {
  projects: ProjectPick[]
}
