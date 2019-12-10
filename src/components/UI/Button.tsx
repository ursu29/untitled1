import React, { PropsWithChildren } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'

interface Props extends PropsWithChildren<any> {
  size: ButtonProps['size']
  type: ButtonProps['type']
  onClick: () => void
}

export default function PortalButton({ children, type, size, onClick }: Props) {
  return (
    <Button type={type} size={size} onClick={onClick}>
      {children}
    </Button>
  )
}
