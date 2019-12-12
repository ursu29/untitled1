import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const ControlBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default function Controls({ children }: PropsWithChildren<any>) {
  return <ControlBar>{children}</ControlBar>
}
