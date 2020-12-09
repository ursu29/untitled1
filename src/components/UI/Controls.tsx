import React, { Children, PropsWithChildren } from 'react'
import styled from 'styled-components'

const ControlBar = styled.div<{ withMargin: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => (props.withMargin ? '4px' : '0')};
`

interface Props extends PropsWithChildren<any> {
  back?: any
  style?: React.CSSProperties
}

export default function Controls({ back, children, style }: Props) {
  return (
    <ControlBar withMargin={Boolean(children)} style={style ? style : {}}>
      <div>{back}</div>
      {children && (
        <div style={{ display: 'flex' }}>
          {Children.map(children, child => (
            <div style={{ margin: 'auto', marginLeft: '10px' }}>{child}</div>
          ))}
        </div>
      )}
    </ControlBar>
  )
}
