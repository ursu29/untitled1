import React, { PropsWithChildren } from 'react'
import { Card } from 'antd'

function ActiveStepCard(props: PropsWithChildren<any>) {
  return <Card>{props.children}</Card>
}

export default ActiveStepCard
