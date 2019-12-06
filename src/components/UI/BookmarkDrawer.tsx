import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import BookmarkCreateForm, { Props as FormProps } from './BookmarkCreateForm'
import styled from 'styled-components'
import { IconProps } from 'antd/lib/icon'

const Controls = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`

interface Props {
  loading: boolean
  togglerLabel: string
  drawerLabel: string
  bookmark?: FormProps['bookmark']
  icon?: IconProps['type']
  onSubmit: (bookmark: FormProps['bookmark'], onDone: () => void) => void
}

export default function BookmarkDrawer(props: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
      <Controls>
        <Button
            icon={props.icon}
            title={props.togglerLabel}
            onClick={() => toggleVisibility(true)}
        ></Button>
        <Drawer
            maskClosable={false}
            title={props.drawerLabel}
            width={480}
            onClose={() => toggleVisibility(false)}
            visible={visible}
        >
          <BookmarkCreateForm
              loading={props.loading}
              bookmark={props.bookmark}
              onSubmit={bookmark => {
                props.onSubmit(bookmark, () => toggleVisibility(false))
              }}
          />
        </Drawer>
      </Controls>
  )
}