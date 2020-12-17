import React from 'react'
import styled from 'styled-components'
import { Snowflake } from './Snowflake'

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function SplashScreen() {
  return (
    <Wrapper>
      <Snowflake size={96} />
    </Wrapper>
  )
}
