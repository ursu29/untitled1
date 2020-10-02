import gql from 'graphql-tag'
import { Project, Employee } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getEmployeeManager($email: String!) {
    employeeByEmail(email: $email) {
      id
      agileManager {
        ...EmployeeDetails
        avatar
      }
    }
  }
  ${fragments.Employee.Details}
`

export type EmployeePick = EmployeeDetails & { avatar: Employee['avatar'] }

export type QueryType = {
  employeeByEmail: {
    id: string
    agileManager: EmployeePick
  }
}
