import gql from 'graphql-tag'
import { Employee } from './types'

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
}

export type EmployeeDetails = Pick<
  Employee,
  'id' | 'name' | 'location' | 'country' | 'position' | 'phoneNumber' | 'email'
>
