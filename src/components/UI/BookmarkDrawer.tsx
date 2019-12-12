import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import BookmarkForm, { Props as FormProps } from './BookmarkForm'
import styled from 'styled-components'
import { IconProps } from 'antd/lib/icon'

const StyledLabel = styled.span`
  color: #8d96ac;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`

interface Props {
  loading: boolean
  togglerLabel?: string
  togglerText?: string
  drawerLabel: string
  bookmark?: FormProps['bookmark']
  icon?: IconProps['type']
  onSubmit: (bookmark: FormProps['bookmark'], onDone: () => void) => void
}

export default function BookmarkDrawer(props: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
    <>
      {props.togglerText && <StyledLabel
        onClick={e => {
          e.preventDefault()
          toggleVisibility(true)
        }}>
        {props.togglerText}
      </StyledLabel>}
      {props.icon && <Button
        icon={props.icon}
        title={props.togglerLabel}
        onClick={() => toggleVisibility(true)}
      ></Button>}
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