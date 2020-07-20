import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Select, Button, Space, Popconfirm } from 'antd'
import dayjs from 'dayjs'
import {
  archivedMatrixVersions,
  archiveMatrix,
  ArchivedMatrixVersions,
} from '../../queries/archiveMatrices'
import message from '../../message'

const { Option } = Select

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
    <div style={{ marginBottom: '25px' }}>
      <div style={{ color: 'black', marginBottom: '8px' }}>
        <span>Version</span>
      </div>
      <Space size="middle">
        <Select
          defaultValue="current"
          style={{ width: 120 }}
          onChange={value => onSelectVersion(value)}
        >
          <Option value="current">current</Option>
          {data?.archivedMatrixVersions.map(e => (
            <Option key={e.id} value={e.id}>
              {dayjs(e.createdAt).format('DD.MM.YYYY')}
            </Option>
          ))}
        </Select>

        {createSnapshotShown && (
          <Popconfirm
            placement="topLeft"
            title="Current version will be saved in the archive"
            onConfirm={() =>
              archive({
                variables,
              })
            }
            okText="Yes"
            cancelText="No"
          >
            <Button>Create Snapshot</Button>
          </Popconfirm>
        )}
      </Space>
    </div>
  )
}
