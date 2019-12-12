import React, { useEffect, useRef } from 'react'
import { Select } from 'antd'
import CSS from 'csstype'

interface Item {
  value: string
  key: string
}

interface Props {
  loading: boolean
  value?: any
  placeholder?: string
  style?: CSS.Properties
  items?: Item[]
  onSelect: (value: any) => void
  onBlur?: () => void
  autoFocus?: boolean
  mode?: 'default' | 'multiple' | 'tags'
}

function PortalSelect(
  { items, loading, mode, style, placeholder, autoFocus, onBlur, onSelect, value }: Props,
  ref: any,
) {
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
      value={value}
      ref={ref}
      onBlur={onBlur}
      id="portal-select"
      autoFocus={autoFocus}
      loading={loading}
      placeholder={placeholder}
      style={{ width: 120, ...style }}
      mode={mode || 'default'}
      showSearch
      labelInValue
      onChange={(value: Item | Item[]) => {
        onSelect(value)
      }}
    >
      {items?.map(item => {
        return (
          <Select.Option key={item.key} value={item.key} title={item.value}>
            {item.value}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default React.forwardRef(PortalSelect)
