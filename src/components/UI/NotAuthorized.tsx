import React from 'react'
import { GATEWAY } from '../../config'
import { Button, Result } from 'antd'

function NotAuthorized() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="Sorry, looks like access is forbidden"
        extra={
          <Button
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = GATEWAY + '/sso/redirect'
            }}
          >
            Try to authorize again
          </Button>
        }
      />
    </div>
  )
}

export default React.memo(NotAuthorized)
