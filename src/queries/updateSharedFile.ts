import gql from 'graphql-tag'
import { File } from '../types'

export default gql`
  mutation updateFile($input: UpdateSharedFilesInput!) {
    updateSharedFile(input: $input) {
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
`

export type UpdateSharedFileMutation = {
  updateSharedFile: Pick<File, 'tags' | 'skills'>
}
