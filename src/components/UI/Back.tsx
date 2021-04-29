import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function Back({ history }: RouteComponentProps) {
  return (
    <Button
      id="back-button"
      icon={<ArrowLeftOutlined />}
      size="small"
      style={{ borderColor: 'transparent', paddingLeft: 0, marginBottom: 20 }}
      type="ghost"
      onClick={() => history.push(history.location.pathname.split('/').slice(0, -1).join('/'))}
    >
      Back
    </Button>
  )
}

export default withRouter(Back)
