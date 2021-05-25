import { useQuery, useMutation } from "@apollo/client";
import React from 'react'
import VersionSnapshot from '../UI/VersionSnapshot'
import {
  archivedMatrixVersions,
  archiveMatrix,
  ArchivedMatrixVersions,
} from '../../queries/archiveMatrices'
import message from '../../message'

export default function ArchiveMatrix({
  employee,
  matrixId,
  onSelectVersion,
  createSnapshotShown,
  employeeMatrixId,
}: {
  employee: string
  matrixId: string
  onSelectVersion: Function
  createSnapshotShown?: boolean
  employeeMatrixId: string
}) {
  const variables = {
    input: {
      employee,
      matrixId,
    },
  }

  // Get matrix versions
  const { data } = useQuery<ArchivedMatrixVersions>(archivedMatrixVersions, {
    variables,
  })

  // Archive matrix
  const [archive] = useMutation(archiveMatrix, {
    onCompleted: () => message.success('New version has been created'),
    refetchQueries: [{ query: archivedMatrixVersions, variables }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  return (
    <VersionSnapshot
      onSelectVersion={(value: string) => onSelectVersion(value)}
      onCreateSnapshot={() =>
        archive({
          variables: { input: { ...variables.input, employeeMatrixId } },
        })
      }
      versionsList={data?.archivedMatrixVersions.map(e => ({ id: e.id, createdAt: e.createdAt }))}
      // isButtonVisible={createSnapshotShown}
      isButtonVisible={true}
      tooltip="Your current matrix view will be archived but it will not change on your page"
    />
  )
}
