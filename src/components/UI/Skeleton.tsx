import React, { PropsWithChildren } from 'react'
import { Skeleton as AntSkeleton } from 'antd'

interface Props extends PropsWithChildren<any> {
  loading: boolean
  avatar?: boolean
  line?: boolean
  padding?: number
}

export default function Skeleton({ loading, padding = 0, children, line, avatar }: Props) {
  return (
    <div style={{ padding: loading && padding ? `0 ${padding}px` : 0 }}>
      <AntSkeleton loading={loading} active avatar={avatar} paragraph={!line}>
        {children}
      </AntSkeleton>
    </div>
  )
}
