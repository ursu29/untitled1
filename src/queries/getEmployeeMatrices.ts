import gql from 'graphql-tag'
import { Employee, Matrix } from '../types'

export default gql`
  query getEmployeeMatrices($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      matrices {
        id
        title
        description
        access {
          read
          write
        }
        body {
          groups {
            id
            title
            description
          }
          grades {
            id
            title
            description
          }
          skills {
            type
            skill {
              id
              name
              description
              isMatrixOnly
            }
            groupId
            gradeId
          }
        }
      }
    }
  }
`

export type QueryType = {
  employees: {
    id: Employee['id']
    name: Employee['name']
    matrices: Matrix[]
  }[]
}
