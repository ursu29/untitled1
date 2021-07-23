import React from 'react'
import { GATEWAY } from '../../config'
import { Button, Result } from 'antd'
import MsIcon from '../../svg/ms-symbollockup.svg'

function NotAuthorized() {
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
        status="403"
        title="Syncretis Portal"
        subTitle="You have to verify your identity."
        extra={
          <Button
            onClick={() => {
              window.location.href = `${GATEWAY}/auth/microsoft`
            }}
            style={{ height: '41px' }}
            icon={<img src={MsIcon} alt="ms-icon" style={{ paddingRight: '12px' }} />}
          >
            Sign in with Microsoft
          </Button>
        }
      />
    </div>
  )
}

export default React.memo(NotAuthorized)
