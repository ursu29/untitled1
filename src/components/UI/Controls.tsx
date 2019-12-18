import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const ControlBar = styled.div<{ withMargin: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => (props.withMargin ? '4px' : '0')};
`

interface Props extends PropsWithChildren<any> {
  back?: any
}

export default function Controls({ back, children }: Props) {
  return (
    <ControlBar withMargin={Boolean(children)}>
      <div>{back}</div>
      <div>{children}</div>
    </ControlBar>
  )
}
