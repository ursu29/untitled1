import { PlusOutlined, TableOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import React from 'react'

export default function TableHeader({
  newButtonText,
  newButtonOnClick,
  columnsButtonClick,
}: {
  newButtonText: string
  newButtonOnClick: () => void
  columnsButtonClick: () => void
}) {
  return (
    <div style={{ margin: '-8px 0 8px 8px' }}>
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
