import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Result, Button, Typography } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Paragraph } = Typography

function Error({ history, error }: RouteComponentProps & { error?: any }) {
  console.error(error)

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
        status="error"
        title="Operation Failed"
        subTitle="You can find detailed information in the console."
        extra={
          history.length && (
            <Button type="default" key="console" onClick={history.goBack}>
              Go Back
            </Button>
          )
        }
      >
        <Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> {error.toString()}
        </Paragraph>
      </Result>
    </div>
  )
}

export default React.memo(withRouter(Error))
