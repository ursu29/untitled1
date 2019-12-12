import gql from 'graphql-tag'
import { Employee } from '../types'

export default gql`
  {
    employees {
      id
      name
      location
      country
      position
      phoneNumber
      email
    }
  }
`

type EmployeePick = Pick<
  Employee,
  'id' | 'name' | 'location' | 'country' | 'position' | 'phoneNumber' | 'email'
>

export type QueryType = {
  employees: EmployeePick[]
}
