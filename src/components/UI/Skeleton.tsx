import React, { PropsWithChildren } from 'react'
import { Skeleton as AntSkeleton } from 'antd'

interface Props extends PropsWithChildren<any> {
  loading: boolean
  avatar?: boolean
}

export default function Skeleton(props: Props) {
  return (
    <AntSkeleton loading={props.loading} active avatar={props.avatar}>
      {props.children}
    </AntSkeleton>
  )
}
