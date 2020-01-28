import React, { PropsWithChildren } from 'react'
import { Divider } from 'antd'

interface Props extends PropsWithChildren<any> {
  type?: 'vertical' | 'horizontal'
  style: React.CSSProperties
}

export default function PortalDivider({ children, style, type }: Props) {
  return (
    <Divider type={type} style={style}>
      {children}
    </Divider>
  )
}
