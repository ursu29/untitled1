import React from 'react'
import { Result, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function NotAllowed({ history }: RouteComponentProps) {
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
        status="403"
        title="Not allowed"
        subTitle="Sorry, you are have no access to this page."
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

export default React.memo(withRouter(NotAllowed))
