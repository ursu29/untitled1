import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'

const { Content: AntContent } = Layout

export default function Content({ children }: PropsWithChildren<any>) {
  return <AntContent>{children}</AntContent>
}
