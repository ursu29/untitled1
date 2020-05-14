import gql from 'graphql-tag'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getEmployee($id: String!) {
    employee(id: $id) {
      ...EmployeeDetails
      avatar
    }
  }
  ${fragments.Employee.Details}
`

export type QueryType = {
  employee: EmployeeDetails & {
    avatar: string
  }
}
