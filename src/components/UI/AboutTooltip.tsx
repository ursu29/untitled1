import React from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type Props = React.PropsWithChildren<
  {
    title: string
    questionIconStyle?: React.CSSProperties
  } & Partial<React.ComponentProps<typeof Tooltip>>
>

export default function AboutTooltip({ children, questionIconStyle, ...props }: Props) {
  return (
    <>
      {children}
      <Tooltip placement="rightTop" {...props}>
        <QuestionCircleOutlined
          style={{
            fontSize: '12px',
            color: '#8c8c8c',
            cursor: 'pointer',
            padding: '0 4px',
            ...questionIconStyle,
          }}
        />
      </Tooltip>
    </>
  )
}
