import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

interface Props extends PropsWithChildren<any> {}

export default function PortalLayout({ children }: Props) {
  return (
    <Sider theme="light" collapsed={false} width="240">
      {children}
    </Sider>
  )
}
