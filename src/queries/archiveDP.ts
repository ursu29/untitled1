import gql from 'graphql-tag'
import { ArchivedDPVersion } from '../types'

export const archiveDP = gql`
  mutation archiveDP($input: ArchiveDPInput) {
    archiveDP(input: $input) {
      compressedData
    }
  }
`

export const archivedDPVersions = gql`
  query archivedDPVersions($input: ArchiveDPInput) {
    archivedDPVersions(input: $input) {
      id
      createdAt
    }
  }
`

export const getArchivedDP = gql`
  query getArchivedDP($input: GetArchivedDPInput) {
    archivedDP(input: $input) {
      compressedData
    }
  }
`

export type ArchivedDPVersions = {
  archivedDPVersions: ArchivedDPVersion[]
}
