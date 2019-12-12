import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import BookmarkForm, { Props as FormProps } from './BookmarkForm'
import { IconProps } from 'antd/lib/icon'

interface Props {
  loading: boolean
  toggler: any
  drawerLabel: string
  bookmark?: FormProps['bookmark']
  icon?: IconProps['type']
  onSubmit: (bookmark: FormProps['bookmark'], onDone: () => void) => void
}

export default function BookmarkDrawer(props: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
    <>
      {React.cloneElement(props.toggler, {onClick: () => toggleVisibility(true)})}
      <Drawer
        maskClosable={false}
        title={props.drawerLabel}
        width={480}
        onClose={() => toggleVisibility(false)}
        visible={visible}
      >
        <BookmarkForm
          loading={props.loading}
          bookmark={props.bookmark}
          onSubmit={bookmark => {
            props.onSubmit(bookmark, () => toggleVisibility(false))
          }}
        />
      </Drawer>
    </>
  )
}