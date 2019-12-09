import gql from 'graphql-tag'
import { Matrix } from '../types'

export default gql`
  {
    matrices {
      id
      title
      description
      body {
        grades {
          id
          title
        }
        groups {
          id
          title
        }
        skills {
          id
          skill {
            id
          }
          gradeId
          groupId
        }
      }
    }
  }
`

export type QueryType = {
  matrices: Matrix[]
}
