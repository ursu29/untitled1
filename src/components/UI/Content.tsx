import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

// const { Content: AntContent } = Layout

const AntContent = styled(Layout.Content)`
  padding: 16px;
`

export default function Content({ children }: PropsWithChildren<any>) {
  return <AntContent>{children}</AntContent>
}
