import React from 'react'
import { Result, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function NotFound({ history, message }: RouteComponentProps & { message?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result
        status="404"
        title="Not found"
        subTitle={message || 'Sorry, such page does not exist'}
        extra={
          history.length && (
            <Button type="default" key="console" onClick={history.goBack}>
              Go Back
            </Button>
          )
        }
      />
    </div>
  )
}

export default React.memo(withRouter(NotFound))
