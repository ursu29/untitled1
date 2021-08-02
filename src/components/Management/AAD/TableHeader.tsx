import { PlusOutlined, TableOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Tooltip } from 'antd'
import React from 'react'

export default function TableHeader({
  newButtonText,
  createAccess,
  newButtonOnClick,
  columnsButtonClick,
  onSearch,
}: {
  newButtonText: string
  createAccess: boolean
  newButtonOnClick: () => void
  columnsButtonClick: () => void
  onSearch: (e: any) => void
}) {
  return (
    <div style={{ margin: '-8px 0 8px 8px' }}>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined style={{ color: 'lightgray', paddingRight: '8px' }} />}
        allowClear={true}
        style={{ maxWidth: '300px', marginRight: '8px' }}
        onChange={onSearch}
      />
      <Tooltip title={!createAccess ? 'You have no access' : ''}>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={newButtonOnClick}
          disabled={!createAccess}
        >
          {newButtonText}
        </Button>
      </Tooltip>
      <Divider type="vertical" />
      <Button type="text" icon={<TableOutlined />} onClick={columnsButtonClick}>
        Columns
      </Button>
    </div>
  )
}
