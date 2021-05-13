import { gql } from "@apollo/client";
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  {
    employees {
      ...EmployeeDetails
    }
  }
  ${fragments.Employee.Details}
`

export type QueryType = {
  employees: EmployeeDetails[]
}
