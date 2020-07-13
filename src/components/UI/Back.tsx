import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'

interface Props {
  goto?: string
}

function Back({ goto, history }: Props & RouteComponentProps) {
  const lastLocation = useLastLocation()

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      size="small"
      style={{ borderColor: 'transparent', paddingLeft: 0, marginBottom: 20 }}
      type="ghost"
      onClick={() => history.goBack()}
      disabled={!lastLocation}
      // onClick={() => history.push(goto)}
    >
      Back
    </Button>
  )
}

export default withRouter(Back)
