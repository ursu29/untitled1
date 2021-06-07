import React from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function AboutTooltip({
  children,
  ...props
}: { children?: JSX.Element } & Partial<React.ComponentProps<typeof Tooltip>> & { title: string }) {
  return (
    <>
      {children}
      <Tooltip placement="rightTop" {...props}>
        <QuestionCircleOutlined
          style={{ fontSize: '12px', color: '#51abff', cursor: 'pointer', padding: '0 4px' }}
        />
      </Tooltip>
    </>
  )
}
