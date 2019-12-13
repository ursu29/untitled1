import gql from 'graphql-tag'
import { Employee, Matrix } from '../types'
import { access } from 'fs'

export default gql`
  query getEmployeeMatrices($input: EmployeesInput) {
    employees(input: $input) {
      id
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
            skill {
              id
              name
              description
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
    matrices: Matrix[]
  }[]
}
