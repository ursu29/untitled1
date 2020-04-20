import React, { PropsWithChildren } from 'react'
import { Drawer } from 'antd'
import { useMediaQuery } from 'react-responsive'

export default function ({
  visible,
  onClose,
  size = 'default',
  children,
}: {
  visible: boolean
  onClose: (e: any) => {}
  size: 'large' | 'default'
} & PropsWithChildren<any>) {
  const drawerWidth = size === 'large' ? 800 : 480
  const isLarge = useMediaQuery({ minWidth: drawerWidth })
  return (
    <Drawer visible={visible} onClose={onClose} width={isLarge ? drawerWidth : '100%'}>
      {children}
    </Drawer>
  )
}
