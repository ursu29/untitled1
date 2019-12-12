import React, { PropsWithChildren } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

interface Props extends PropsWithChildren<any> {
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  icon?: ButtonProps['icon']
  onClick?: () => void
}

export default function PortalButton({ children, icon, type, size, onClick }: Props) {
  return (
    <Button icon={icon} type={type} size={size} onClick={onClick}>
      {children}
    </Button>
  )
}
