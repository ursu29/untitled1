import React, { useState } from 'react'
import { Drawer } from 'antd'

interface Props {
  drawerLabel: string
  toggler: any
  content: any
  size?: 'default' | 'large'
}

export default function PortalDrawer({ drawerLabel, toggler, content, size }: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
    <>
      {React.cloneElement(toggler, { onClick: () => toggleVisibility(true) })}
      <Drawer
        maskClosable={false}
        title={drawerLabel}
        width={size === 'large' ? 800 : 480}
        onClose={() => toggleVisibility(false)}
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
