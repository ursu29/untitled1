import gql from 'graphql-tag'
import { Employee } from '../types'
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
