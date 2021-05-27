import { gql } from '@apollo/client'
import { ArchivedMatrixVersion } from '../types'

export const archiveMatrix = gql`
  mutation archiveMatrix($input: ArchiveMatrixInput) {
    archiveMatrix(input: $input) {
      matrixId
    }
  }
`

export const archivedMatrixVersions = gql`
  query archivedMatrixVersions($input: ArchiveMatrixInput) {
    archivedMatrixVersions(input: $input) {
      id
      createdAt
    }
  }
`

export const getArchivedMatrix = gql`
  query getArchivedMatrix($input: GetArchivedMatrixInput) {
    archivedMatrix(input: $input) {
      matrixId
      compressedData
    }
  }
`

export type ArchivedMatrixVersions = {
  archivedMatrixVersions: ArchivedMatrixVersion[]
}
