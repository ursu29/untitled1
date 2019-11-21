import React, { PropsWithChildren } from 'react'
import { Skeleton, Timeline } from 'antd'

interface Props extends PropsWithChildren<any> {
  loading?: boolean
  items?: {
    render: React.ReactNode
  }[]
}

export default function PostList({ items, loading, ...props }: Props) {
  return (
    <Skeleton loading={loading} active>
      <Timeline>
        {items?.map(item => (
          <Timeline.Item>{item.render}</Timeline.Item>
        ))}
      </Timeline>
    </Skeleton>
  )
}
