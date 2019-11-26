import gql from 'graphql-tag'
import { Skill, Employee } from '../types'

export default gql`
  {
    skills {
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
