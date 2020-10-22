import React from 'react'
import { Input } from 'antd'

interface Props {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  onBlur?: any
  defaultValue?: string
  style?: object
}

export default function PortalInput({
  onChange,
  onBlur,
  placeholder,
  value,
  defaultValue,
  style,
}: Props) {
  return (
    <Input
      style={{ width: '100%', ...style }}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onBlur={() => onBlur && onBlur()}
    />
  )
}
