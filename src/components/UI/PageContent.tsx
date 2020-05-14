import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import useOffset from '../../utils/useOffset'

const Container = styled.div<{ offset: number; small: number; noBottom: boolean; noTop: boolean }>`
  padding: ${(props) => `${props.offset}px`};
  padding-bottom: ${(props) => (props.noBottom ? `${props.small}px` : `${props.offset}px`)};
  padding-top: ${(props) => (props.noTop ? `${props.small}px` : `${props.offset}px`)};
`

export default function PageContent(
  props: { noBottom: boolean; noTop: boolean; style: any } & PropsWithChildren<any>,
) {
  const { offset, offsets } = useOffset()
  return (
    <Container offset={offset} small={offsets.SMALL} {...props}>
      {props.children}
    </Container>
  )
}
