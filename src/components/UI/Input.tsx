import React from 'react'
import { Input } from 'antd'

interface Props {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  style?: object
}

export default function PortalInput({ onChange, placeholder, value, style }: Props) {
  return (
    <Input
      style={{ width: '100%', ...style }}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  )
}
