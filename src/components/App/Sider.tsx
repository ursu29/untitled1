import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ProfileSider from '../Profile/ProfileSider'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'

const ScrollableWrap = styled.div<{ width: number }>`
  position: fixed;
  top: 0px;
  height: 100vh;
  display: flex;
  width: ${props => props.width + 15}px;
  flex-direction: column;
  padding-bottom: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: width 0.1s linear;
`

function PortalSider({ location }: RouteComponentProps) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <Sider>
      <ScrollableWrap width={isLarge ? 240 : 60}>
        <ProfileSider />
        <Menu path={'/' + location.pathname.split('/')[1]} />
      </ScrollableWrap>
    </Sider>
  )
}

export default withRouter(PortalSider)
