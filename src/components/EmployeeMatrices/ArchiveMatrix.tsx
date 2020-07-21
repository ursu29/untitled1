import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import VersionSnapshot from '../UI/VersionSnapshot'
import {
  archivedMatrixVersions,
  archiveMatrix,
  ArchivedMatrixVersions,
} from '../../queries/archiveMatrices'
import message from '../../message'

export default function ArchiveMatrix({
  employeeAzureId,
  matrixId,
  onSelectVersion,
  createSnapshotShown,
}: {
  employeeAzureId: string
  matrixId: string
  onSelectVersion: Function
  createSnapshotShown: boolean
}) {
  const variables = {
    input: {
      employeeAzureId,
      matrixId,
    },
  }

  // Get matrix versions
  const { data } = useQuery<ArchivedMatrixVersions>(archivedMatrixVersions, {
    variables,
  })

  // Archive matrix
  const [archive] = useMutation(archiveMatrix, {
    onCompleted: () => message.success('Snapshot has been created'),
    refetchQueries: [{ query: archivedMatrixVersions, variables }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  return (
    <VersionSnapshot
      onSelectVersion={(value: string) => onSelectVersion(value)}
      onCreateSnapshot={() =>
        archive({
          variables,
        })
      }
      versionsList={data?.archivedMatrixVersions.map(e => ({ id: e.id, createdAt: e.createdAt }))}
      isButtonVisible={createSnapshotShown}
    />
  )
}
