import React from 'react'
import { Skeleton, Typography } from 'antd'
const { Text } = Typography

export default function Bonuses() {
  return (
    <Skeleton loading={false} active paragraph={false} title={{ style: { marginTop: 3 } }}>
      <Text>9999 р</Text>
    </Skeleton>
  )
}
