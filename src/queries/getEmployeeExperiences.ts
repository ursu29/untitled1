import gql from 'graphql-tag'
import { Employee } from '../types'

export default gql`
  query getEmployeeExperiences($input: EmployeesInput) {
    employees(input: $input) {
      id
      experiences {
        id
        skill {
          id
        }
        level {
          id
          index
          name
        }
      }
    }
  }
`

type EmployeePick = Pick<Employee, 'id' | 'experiences'>

export type QueryType = {
  employees: EmployeePick[]
}
