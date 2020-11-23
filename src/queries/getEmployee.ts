import gql from 'graphql-tag'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
    }
  }
  ${fragments.Employee.Details}
`

export type QueryType = {
  employeeByEmail: EmployeeDetails
}
