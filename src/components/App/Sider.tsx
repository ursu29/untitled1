import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { COLLAPSE_WIDTH } from '../../config'
import ProfileSider from '../Profile/ProfileSider'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'

const ScrollableWrap = styled.div<{ minWidth: number }>`
  position: fixed;
  top: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  min-width: ${props => props.minWidth}px;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* WebKit */
  }
`

function PortalSider({ location }: RouteComponentProps) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  return (
    <Sider>
      <ScrollableWrap minWidth={isLarge ? 240 : 60}>
        <ProfileSider />
        <Menu path={'/' + location.pathname.split('/')[1]} />
      </ScrollableWrap>
    </Sider>
  )
}

export default withRouter(PortalSider)
