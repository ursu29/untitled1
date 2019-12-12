import React, { PropsWithChildren } from 'react'
import { Divider } from 'antd'

export default function PortalDivider({ children }: PropsWithChildren<any>) {
  return <Divider>{children}</Divider>
}
