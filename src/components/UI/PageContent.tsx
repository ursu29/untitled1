import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

const small = '15px'
const large = '60px'

const Container = styled.div<{ isLarge: boolean; noBottom: boolean; noTop: boolean }>`
  padding: ${props => (props.isLarge ? large : small)};
  padding-bottom: ${props => (props.noBottom ? small : props.isLarge ? large : small)};
  padding-top: ${props => (props.noTop ? small : props.isLarge ? large : small)};
`

export default function PageContent(
  props: { noBottom: boolean; noTop: boolean; style: any } & PropsWithChildren<any>,
) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Container isLarge={isLarge} {...props}>
      {props.children}
    </Container>
  )
}
