import React, { PropsWithChildren } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

interface Props extends PropsWithChildren<any> {
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  icon?: ButtonProps['icon']
  onClick?: () => void
  style?: any
}

export default function PortalButton({ children, icon, type, size, onClick, style }: Props) {
  return (
    <Button icon={icon} type={type} size={size} onClick={onClick} style={style}>
      {children}
    </Button>
  )
}
