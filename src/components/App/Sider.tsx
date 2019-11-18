import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ProfileSider from '../Profile/ProfileSider'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'

function PortalSider({ location }: RouteComponentProps) {
  return (
    <Sider>
      <ProfileSider />
      <Menu path={'/' + location.pathname.split('/')[1]} />
    </Sider>
  )
}

export default withRouter(PortalSider)
