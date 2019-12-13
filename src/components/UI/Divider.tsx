import React, { PropsWithChildren } from 'react'
import { Divider } from 'antd'

interface Props extends PropsWithChildren<any> {
  type?: 'vertical' | 'horizontal'
}

export default function PortalDivider({ children, type }: Props) {
  return <Divider type={type}>{children}</Divider>
}
