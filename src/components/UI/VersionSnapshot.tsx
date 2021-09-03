import React from 'react'
import { Select, Button, Space, Popconfirm, Tooltip } from 'antd'
import dayjs from 'dayjs'

const { Option } = Select

interface Props {
  onSelectVersion: any
  onCreateSnapshot: any
  versionsList?: { id: string; createdAt: string }[]
  isButtonVisible: boolean
  buttonText?: string
  tooltip?: string
}

export default function VersionSnapshot({
  onSelectVersion,
  onCreateSnapshot,
  versionsList,
  isButtonVisible,
  buttonText,
  tooltip,
}: Props) {
  return (
    <div>
      <div id="VersionSnapshot" style={{ color: 'black', marginBottom: '5px' }}>
        <span>Version</span>
      </div>
      <Space size="small">
        <Select
          defaultValue="current"
          style={{ width: 200 }}
          onChange={onSelectVersion}
          size="small"
        >
          <Option value="current">Current</Option>
          {versionsList?.map(e => (
            <Option key={e.id} value={e.id}>
              {dayjs(e.createdAt).format('DD.MM.YYYY')}
            </Option>
          ))}
        </Select>

        {isButtonVisible && (
          <Tooltip placement="topLeft" title={tooltip}>
            <Popconfirm
              placement="topLeft"
              title="Current version will be saved in the archive. This can be done once this document is discussed and confirmed by your Agile Manager? Do you want to continue?"
              onConfirm={onCreateSnapshot}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small">{buttonText || 'Create New Version'}</Button>
            </Popconfirm>
          </Tooltip>
        )}
      </Space>
    </div>
  )
}
