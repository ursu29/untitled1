import React, { PropsWithChildren } from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

interface Props extends PropsWithChildren<any> {
  size?: ButtonProps['size']
  shape?: ButtonProps['shape']
  type?: ButtonProps['type']
  icon?: ButtonProps['icon']
  onClick?: () => void
  style?: any
  disabled?: boolean
}

export default function PortalButton({
  children,
  icon,
  type,
  size,
  onClick,
  style,
  shape,
  disabled,
}: Props) {
  return (
    <Button
      icon={<LegacyIcon type={icon} />}
      type={type}
      size={size}
      shape={shape}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
