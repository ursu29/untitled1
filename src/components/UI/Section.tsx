import React, { PropsWithChildren } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

interface Props extends PropsWithChildren<any> {}

export default function Section({ title, children }: Props) {
  return (
    <div>
      <Title level={3} style={{ fontWeight: 'normal' }}>
        {title}
      </Title>
      {children}
    </div>
  )
}