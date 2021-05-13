import { gql } from "@apollo/client";
import { File, Employee } from '../types'

export default gql`
  query sharedFiles($input: SharedFilesInput) {
    sharedFiles(input: $input) {
      hasMore
      files {
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
  sharedFiles: {
    hasMore: boolean
    files: FilesPick[]
  }
}
