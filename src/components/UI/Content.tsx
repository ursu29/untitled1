import React, { PropsWithChildren, Children } from 'react'
import { Layout } from 'antd'

const { Content: AntContent } = Layout

export default function Content({ children }: PropsWithChildren<any>) {
  return <AntContent>{children}</AntContent>
}
