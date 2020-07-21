import React from 'react'
import { Select, Button, Space, Popconfirm } from 'antd'
import dayjs from 'dayjs'

const { Option } = Select

interface Props {
  onSelectVersion: any
  onCreateSnapshot: any
  versionsList?: { id: string; createdAt: string }[]
  isButtonVisible: boolean
  buttonText?: string
}

export default function VersionSnapshot({
  onSelectVersion,
  onCreateSnapshot,
  versionsList,
  isButtonVisible,
  buttonText,
}: Props) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <div style={{ color: 'black', marginBottom: '8px' }}>
        <span>Version</span>
      </div>
      <Space size="middle">
        <Select defaultValue="current" style={{ width: 120 }} onChange={onSelectVersion}>
          <Option value="current">current</Option>
          {versionsList?.map(e => (
            <Option key={e.id} value={e.id}>
              {dayjs(e.createdAt).format('DD.MM.YYYY')}
            </Option>
          ))}
        </Select>

        {isButtonVisible && (
          <Popconfirm
            placement="topLeft"
            title="Current version will be saved in the archive"
            onConfirm={onCreateSnapshot}
            okText="Yes"
            cancelText="No"
          >
            <Button>{buttonText || 'Create Snapshot'}</Button>
          </Popconfirm>
        )}
      </Space>
    </div>
  )
}
