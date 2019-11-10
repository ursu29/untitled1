import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

interface Props extends PropsWithChildren<any> {
  collapsed: boolean
}

export default function PortalLayout({ children, collapsed }: Props) {
  return (
    <Sider theme="light" collapsed={false}>
      {children}
    </Sider>
  )
}
