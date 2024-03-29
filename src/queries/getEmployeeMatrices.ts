import { gql } from '@apollo/client'
import { Employee, Matrix } from '../types'

export default gql`
  query getEmployeeMatrices($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      isMe
      matrices {
        id
        title
        description
        comment
        employeeMatrixId
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
            id
            skill {
              id
              name
              description
              isMatrixOnly
              acceptanceCriteria
              sources
              additionalSources
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
    isMe: Employee['isMe']
    matrices: Matrix[]
  }[]
}
