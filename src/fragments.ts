import gql from 'graphql-tag'
import { Employee, Experience, Level, Skill } from './types'

export default {
  Employee: {
    Details: gql`
      fragment EmployeeDetails on Employee {
        id
        name
        location
        country
        position
        phoneNumber
        email
      }
    `,
  },
  Experience: {
    Details: gql`
      fragment ExperienceDetails on Experience {
        id
        level {
          id
          index
          name
        }
        skill {
          id
          name
          description
          isMatrixOnly
        }
      }
    `,
  },
}

export type EmployeeDetails = Pick<
  Employee,
  'id' | 'name' | 'location' | 'country' | 'position' | 'phoneNumber' | 'email'
>

export type ExperienceDetails = Pick<Experience, 'id'> & {
  level: Pick<Level, 'id' | 'index' | 'name'>
  skill: Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>
}
