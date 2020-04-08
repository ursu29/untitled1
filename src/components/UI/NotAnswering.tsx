import React from 'react'
import { Result } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function NotAnswering({ history }: RouteComponentProps) {
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
      <Result
        status="500"
        title="Server is not answering"
        subTitle="Application is probably on maintenance, try to open this page later"
      />
    </div>
  )
}

export default React.memo(withRouter(NotAnswering))
