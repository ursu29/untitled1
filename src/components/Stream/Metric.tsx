import React from 'react'
import { Tooltip } from 'antd'
import { PlayCircleOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons'
import { IconWrapper } from './styled'

export default function Metric({ name, number }: { name: string; number: number }) {
  return (
    <Tooltip key={name} title={number + ' ' + name} placement="bottom">
      <IconWrapper>
        <span style={{ fontSize: '13px' }}>{number}</span>
        <div style={{ marginLeft: '5px' }}>
          {name === 'views' ? (
            <PlayCircleOutlined />
          ) : name === 'likes' ? (
            <HeartOutlined />
          ) : name === 'comments' ? (
            <MessageOutlined />
          ) : (
            ''
          )}
        </div>
      </IconWrapper>
    </Tooltip>
  )
}
