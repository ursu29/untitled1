import React, { useState } from 'react'
import { Drawer } from 'antd'

interface Props {
  loading: boolean
  Form: any
  values?: any
  drawerLabel: string
  toggler: any
  size?: 'default' | 'large'
  onSubmit: (values: any, onDone: () => void) => void
  TagSelect: any
}

export default function PortalDrawer({
  loading,
  drawerLabel,
  values,
  Form,
  TagSelect,
  toggler,
  size,
  onSubmit,
}: Props) {
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
        <Form
          loading={loading}
          values={values}
          TagSelect={TagSelect} //TODO!!!!!!!!!!!
          onSubmit={(values: any, reset: () => void) => {
            onSubmit(values, () => {
              toggleVisibility(false)
              if (reset) {
                reset()
              }
            })
          }}
        />
      </Drawer>
    </>
  )
}
