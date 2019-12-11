import gql from 'graphql-tag'
import { Employee, Matrix } from '../types'

export default gql`
  query getEmployeeMatrices($input: EmployeesInput) {
    employees(input: $input) {
      id
      matrices {
        id
        title
        description
      }
    }
  }
`

export type QueryType = {
  employees: { id: Employee['id']; matrices: Pick<Matrix, 'id' | 'title' | 'description'>[] }[]
}
