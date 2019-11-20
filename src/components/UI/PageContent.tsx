import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 60px;
`

export default function PageContent(props: PropsWithChildren<any>) {
  return <Container>{props.children}</Container>
}
