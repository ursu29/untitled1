import React, { useRef } from 'react'
import { Input, Modal } from 'antd'
import styled from 'styled-components'
import './styles.css'

const TextArea = styled(Input.TextArea)`
  resize: none;
`

interface Props {
  title: string
  visible: boolean
  onOk: (value: string) => void
  onCancel: () => void
  defaultComment: string
}

export default function CommentModal({ title, visible, onOk, onCancel, defaultComment }: Props) {
  const inputRef = useRef<Input>(null)
  return (
    <Modal
      className="styled_modal_comment"
      title={title}
      visible={visible}
      onOk={() => {
        const value = inputRef.current?.state.value || ''
        onOk(value)
      }}
      onCancel={onCancel}
      okText="Post"
      cancelText="Cancel"
      centered
      closable={false}
      destroyOnClose
      style={{ maxWidth: '400px' }}
    >
      <TextArea
        // @ts-ignore
        ref={inputRef}
        autoSize={{ minRows: 4, maxRows: 4 }}
        rows={4}
        defaultValue={defaultComment}
      />
    </Modal>
  )
}
