import gql from 'graphql-tag'
import { Matrix, Access } from '../types'

export default gql`
  {
    matrices {
      id
      title
      description
    }
    matricesAccess {
      read
    }
  }
`

export type QueryType = {
  matrices: Pick<Matrix, 'id' | 'title' | 'description'>[]
  matricesAccess: Pick<Access, 'read'>
}
