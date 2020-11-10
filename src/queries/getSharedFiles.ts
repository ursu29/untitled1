import gql from 'graphql-tag'
import { File, Employee } from '../types'

export default gql`
  query sharedFiles {
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
      details {
        id
        skills {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  }
`

export type FilesPick = Pick<
  File,
  'id' | 'url' | 'fileName' | 'createdAt' | 'size' | 'type' | 'details'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'> | null
}

export type QueryType = {
  sharedFiles: FilesPick[]
}
