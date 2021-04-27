import React from 'react'
import { Drawer } from 'antd'
import { useMediaQuery } from 'react-responsive'

export default function ({
  visible,
  onClose,
  size = 'default',
  ...props
}: {
  visible: boolean
  onClose: () => any
  size?: 'large' | 'default'
} & React.ComponentProps<typeof Drawer>) {
  const drawerWidth = size === 'large' ? 800 : 480
  const isLarge = useMediaQuery({ minWidth: drawerWidth })
  return (
    <Drawer visible={visible} onClose={onClose} width={isLarge ? drawerWidth : '100%'} {...props}>
      {props.children}
    </Drawer>
  )
}
