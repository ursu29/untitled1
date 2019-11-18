import React from 'react'
import { Result, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function UnderConstruction({ history }: RouteComponentProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <Result
        status="info"
        title="Section is under construction"
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

export default React.memo(withRouter(UnderConstruction))
