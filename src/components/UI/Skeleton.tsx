import React, { PropsWithChildren } from 'react'
import { Skeleton as AntSkeleton } from 'antd'
import useOffset from '../../utils/useOffset'

interface Props extends PropsWithChildren<any> {
  loading: boolean
  avatar?: boolean
  line?: boolean
  withOffset?: boolean
  // padding?: number
}

export default function Skeleton({ loading, withOffset, children, line, avatar }: Props) {
  const { offset } = useOffset()
  return (
    <div style={{ padding: loading && withOffset ? offset : 0 }}>
      <AntSkeleton loading={loading} active avatar={avatar} paragraph={!line}>
        {children}
      </AntSkeleton>
    </div>
  )
}
