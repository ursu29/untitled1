import gql from 'graphql-tag'
import { ArchivedSEFVersion } from '../types'

export const archiveSEF = gql`
  mutation archiveSEF($input: ArchiveSEFInput) {
    archiveSEF(input: $input) {
      employeeAzureEmail
    }
  }
`

export const archivedSEFVersions = gql`
  query archivedSEFVersions($input: ArchiveSEFInput) {
    archivedSEFVersions(input: $input) {
      id
      createdAt
    }
  }
`

export const getArchivedSEF = gql`
  query getArchivedSEF($input: GetArchivedSEFInput) {
    archivedSEF(input: $input) {
      employeeAzureEmail
      compressedData
    }
  }
`

export type ArchivedSEFVersions = {
  archivedSEFVersions: ArchivedSEFVersion[]
}
