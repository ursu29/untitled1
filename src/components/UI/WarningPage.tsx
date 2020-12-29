import React from 'react'
import { Result } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function NotFound({ history, title }: RouteComponentProps & { title?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 16,
      }}
    >
      <Result status="warning" title={title || 'The server is under maintenance'} />
    </div>
  )
}

export default React.memo(withRouter(NotFound))
