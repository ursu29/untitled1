import React from 'react'
import { Avatar } from 'antd'

interface Props {
  size?: number
  shape?: 'square' | 'circle'
  src?: string
}

export default (props: Props) => (
  <Avatar
    size={props.size || 'large'}
    shape={props.shape || 'circle'}
    icon="user"
    src={props.src}
  />
)
