import { Select } from 'antd'
import React, { useEffect } from 'react'

interface Item {
  value: string
  key: string
}

export interface Props {
  loading: boolean
  allowClear?: boolean
  value?: Item | Item[] | null
  placeholder?: string
  size?: 'large' | 'middle' | 'small'
  style?: any
  items?: Item[]
  onSelect: (value: any) => void
  onBlur?: () => void
  autoFocus?: boolean
  mode?: 'multiple' | 'tags' | null
  open?: boolean
  selectProps?: React.ComponentProps<typeof Select>
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
    open,
    selectProps,
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
      //@ts-ignore
      value={value}
      ref={ref}
      onBlur={onBlur}
      allowClear={allowClear}
      id="portal-select"
      autoFocus={autoFocus}
      open={open}
      size={size || 'middle'}
      loading={loading}
      placeholder={placeholder}
      style={{ width: 120, ...style }}
      showSearch
      labelInValue
      onChange={value => {
        onSelect(value)
      }}
      filterOption={(input, option) =>
        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...selectConditionalProps}
      {...selectProps}
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
