import { gql } from '@apollo/client'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getEmployeeManager($email: String!) {
    employeeByEmail(email: $email) {
      id
      agileManager {
        ...EmployeeDetails
      }
    }
  }
  ${fragments.Employee.Details}
`

export type EmployeePick = EmployeeDetails

export type QueryType = {
  employeeByEmail: {
    id: string
    agileManager: EmployeePick
  }
}
