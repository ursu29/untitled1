import React from 'react'
import { Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  goto: string
}

function Back({ goto, history }: Props & RouteComponentProps) {
  return (
    <Button
      icon="arrow-left"
      size="small"
      style={{ borderColor: 'transparent', paddingLeft: 0, marginBottom: 4 }}
      type="ghost"
      onClick={() => history.push(goto)}
    >
      Back
    </Button>
  )
}

export default withRouter(Back)
