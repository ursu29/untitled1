import React from 'react'
import { Input } from 'antd'

interface Props {
  value?: string
  onChange: (value: string) => void
}

export default function PortalInput({ onChange, value }: Props) {
  return <Input style={{ width: '100%' }} value={value} onChange={e => onChange(e.target.value)} />
}
