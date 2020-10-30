import gql from 'graphql-tag'
import { Employee } from '../types'

export const query = gql`
  query getMySubordinates {
    profile {
      id
      subordinateUsers {
        id
        avatar
        name
        email
        position
        lastManagerMeeting
        leadingProjects {
          id
          name
          code
        }
        projects {
          id
          name
          code
        }
      }
    }
  }
`

export type QueryType = {
  profile: {
    id: string
    subordinateUsers: Partial<Employee>[]
  }
}
