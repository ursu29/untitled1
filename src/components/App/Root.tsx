import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Layout from '../UI/Layout'
import Menu from '../UI/Menu'
import Sider from '../UI/Sider'

function Root({ location }: RouteComponentProps) {
  return (
    <Layout>
      <Sider collapsed={true}>
        <Menu path={'/' + location.pathname.split('/')[1]} />
      </Sider>
    </Layout>
  )
}

export default withRouter(Root)
