import React from 'react'
import { Input } from 'antd'

interface Props {
  value?: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function PortalInput({ onChange, placeholder, value }: Props) {
  return (
    <Input
      style={{ width: '100%' }}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  )
}
