import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ProfileSider from '../Profile/ProfileSider'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'

const ScrollableWrap = styled.div`
  position: fixed;
  top: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`

function PortalSider({ location }: RouteComponentProps) {
  return (
    <Sider>
      <ScrollableWrap>
        <ProfileSider />
        <Menu path={'/' + location.pathname.split('/')[1]} />
      </ScrollableWrap>
    </Sider>
  )
}

export default withRouter(PortalSider)
