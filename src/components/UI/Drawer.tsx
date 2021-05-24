import React, { useState } from 'react'
import { Drawer } from 'antd'
import { useMediaQuery } from 'react-responsive'

interface Props {
  drawerLabel: string
  toggler: any
  content: any
  size?: 'default' | 'large'
  isOpen?: boolean
  onClose?: any
}

export default function PortalDrawer({
  drawerLabel,
  toggler,
  isOpen,
  content,
  size,
  onClose,
}: Props) {
  const [visible, toggleVisibility] = useState(false || isOpen)
  const drawerWidth = size === 'large' ? 800 : 480
  const isLarge = useMediaQuery({ minWidth: drawerWidth })
  return (
    <>
      {!isOpen && React.cloneElement(toggler, { onClick: () => toggleVisibility(true) })}
      <Drawer
        maskClosable={false}
        title={drawerLabel}
        width={isLarge ? drawerWidth : '100%'}
        onClose={() => {
          toggleVisibility(false)
          if (onClose) setTimeout(() => onClose(), 1000)
        }}
        visible={visible}
      >
        {visible &&
          React.cloneElement(content, {
            onSubmit: (values: any, reset: () => void) => {
              if (content.props.onSubmit) {
                content.props.onSubmit(values, () => {
                  if (reset) {
                    reset()
                  }
                  toggleVisibility(false)
                })
              }
            },
          })}
      </Drawer>
    </>
  )
}
