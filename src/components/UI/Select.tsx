import React, { useEffect, useRef } from 'react'
import { Select } from 'antd'

interface Item {
  value: string
  key: string
}

interface Props {
  loading: boolean
  items?: Item[]
  onSelect: (key: Item['key']) => void
  onBlur?: () => void
  autoFocus?: boolean
}

export default function PortalSelect({ items, loading, autoFocus, onBlur, onSelect }: Props) {
  useEffect(() => {
    if (autoFocus) {
      const select = document.getElementById('portal-select')
      if (select) {
        select.click()
      }
    }
  })

  return (
    <Select
      onBlur={onBlur}
      id="portal-select"
      autoFocus={autoFocus}
      loading={loading}
      style={{ width: 120 }}
      showSearch
      labelInValue
      onChange={(item: Item) => {
        onSelect(item.key)
      }}
    >
      {items?.map(item => {
        return (
          <Select.Option key={item.key} value={item.key}>
            {item.value}
          </Select.Option>
        )
      })}
    </Select>
  )
}
