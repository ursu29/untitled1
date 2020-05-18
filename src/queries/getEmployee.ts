import gql from 'graphql-tag'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
      avatar
    }
  }
  ${fragments.Employee.Details}
`

export type QueryType = {
  employeeByEmail: EmployeeDetails & {
    avatar: string
  }
}
