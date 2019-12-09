import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ProfileSider from '../Profile/ProfileSider'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'

function PortalSider({ location }: RouteComponentProps) {
  return (
    <Sider>
      <div style={{ position: 'sticky', top: 0 }}>
        <ProfileSider />
        <Menu path={'/' + location.pathname.split('/')[1]} />
      </div>
    </Sider>
  )
}

export default withRouter(PortalSider)
