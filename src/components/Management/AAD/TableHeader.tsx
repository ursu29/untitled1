import { PlusOutlined, TableOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Divider, Input } from 'antd'
import React from 'react'

export default function TableHeader({
  newButtonText,
  newButtonOnClick,
  columnsButtonClick,
  onSearch,
}: {
  newButtonText: string
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
      <Button type="text" icon={<PlusOutlined />} onClick={newButtonOnClick}>
        {newButtonText}
      </Button>
      <Divider type="vertical" />
      <Button type="text" icon={<TableOutlined />} onClick={columnsButtonClick}>
        Columns
      </Button>
    </div>
  )
}
