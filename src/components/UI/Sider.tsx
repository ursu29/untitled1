import React, { PropsWithChildren, useState } from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

interface Props extends PropsWithChildren<any> {}

export default function PortalLayout({ children }: Props) {
  // const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider
      theme="light"
      // collapsed={collapsed}
      width="240"
    >
      {children}
    </Sider>
  )
}
