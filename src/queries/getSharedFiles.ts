import gql from 'graphql-tag'
import { File, Employee } from '../types'

export default gql`
  {
    sharedFiles {
      id
      url
      fileName
      createdAt
      createdBy {
        id
        name
        email
      }
      size
      type
    }
  }
`

type FilesPick = Pick<File, 'id' | 'url' | 'fileName' | 'createdAt' | 'size' | 'type'> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'> | null
}

export type QueryType = {
  sharedFiles: FilesPick[]
}
