import gql from 'graphql-tag'
import { Skill, Employee } from '../types'

export default gql`
  query getSkills($input: SkillsInput) {
    skills(input: $input) {
      id
      name
      description
      parent {
        id
      }
      isMatrixOnly
    }
  }
`

type SkillPick = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'> & {
  parent: Pick<Employee, 'id'> | null
}

export type QueryType = {
  skills: SkillPick[]
}
