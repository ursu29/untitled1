import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: sticky;
  top: 0;
  z-index: 2; */
`

interface Props extends PropsWithChildren<any> {
  back?: any
}

export default function Controls({ back, children }: Props) {
  return (
    <ControlBar>
      {/* <Card
        size="small"
        bordered={false}
        style={{ width: '100%' }}
        bodyStyle={{ padding: '8px 0', display: 'flex', justifyContent: 'flex-end' }}
      > */}
      <div>{back}</div>
      <div>{children}</div>
      {/* </Card> */}
    </ControlBar>
  )
}
