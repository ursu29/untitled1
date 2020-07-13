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
  size?: 'large' | 'middle' | 'small'
  style?: any
  items?: Item[]
  onSelect: (value: any) => void
  onBlur?: () => void
  autoFocus?: boolean
  mode?: 'multiple' | 'tags' | null
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

  const selectConditionalProps = {}

  //@ts-ignore
  if (mode) selectConditionalProps.mode = mode

  return (
    <Select
      value={value}
      ref={ref}
      onBlur={onBlur}
      allowClear={allowClear}
      id="portal-select"
      autoFocus={autoFocus}
      size={size || 'middle'}
      loading={loading}
      placeholder={placeholder}
      style={{ width: 120, ...style }}
      showSearch
      labelInValue
      onChange={value => {
        onSelect(value)
      }}
      {...selectConditionalProps}
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
