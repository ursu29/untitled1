import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

const Container = styled.div<{ isLarge: boolean }>`
  padding: ${props => (props.isLarge ? '60px' : '15px')};
`

export default function PageContent(props: PropsWithChildren<any>) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return <Container isLarge={isLarge}>{props.children}</Container>
}
