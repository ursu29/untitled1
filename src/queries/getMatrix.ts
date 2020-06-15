import gql from 'graphql-tag'
import { Matrix } from '../types'

export default gql`
  query getMatrices($input: MatricesInput) {
    matrices(input: $input) {
      id
      title
      body {
        groups {
          id
          title
        }
        grades {
          id
          title
        }
        skills {
          id
          type
          skill {
            id
            name
            description
          }
          groupId
          gradeId
        }
      }
      access {
        read
        write
      }
    }
  }
`

export type QueryType = {
  matrices: Matrix[]
}
