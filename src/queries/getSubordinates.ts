import gql from 'graphql-tag'
import { Employee } from '../types'

export const query = gql`
  query getSubordinates($email: String!) {
    employeeByEmail(email: $email) {
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
  employeeByEmail: {
    id: string
    subordinateUsers: Partial<Employee>[]
  }
}
