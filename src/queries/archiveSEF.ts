import { gql } from '@apollo/client'
import { ArchivedSEFVersion } from '../types'

export const archiveSEF = gql`
  mutation archiveSEF($input: ArchiveSEFInput) {
    archiveSEF(input: $input) {
      compressedData
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
      compressedData
    }
  }
`

export type ArchivedSEFVersions = {
  archivedSEFVersions: ArchivedSEFVersion[]
}
