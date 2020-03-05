import { Select } from 'antd'
import React, { useEffect } from 'react'

interface Item {
  value: string
  key: string
}

export interface Props {
  loading: boolean
  allowClear?: boolean
  value?: any
  placeholder?: string
  size?: 'default' | 'small'
  style?: any
  items?: Item[]
  onSelect: (value: any) => void
  onBlur?: () => void
  autoFocus?: boolean
  mode?: 'default' | 'multiple' | 'tags'
}

function PortalSelect(
  {
    items,
    loading,
    mode,
    style,
    allowClear,
    placeholder,
    autoFocus,
    onBlur,
    size,
    onSelect,
    value,
  }: Props,
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
      allowClear={allowClear}
      id="portal-select"
      autoFocus={autoFocus}
      size={size}
      loading={loading}
      placeholder={placeholder}
      style={{ width: 120, ...style }}
      mode={mode || 'default'}
      showSearch
      labelInValue
      onChange={(value: Item | Item[], option: any) => {
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
