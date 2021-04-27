import React from 'react'
import { Input, Modal } from 'antd'
import './styles.css'

interface Props {
  title: string
  visible: boolean
  onOk: (value?: string) => void
  onCancel: () => void
  defaultComment: string
}

export default function CommentModal({ title, visible, onOk, onCancel, defaultComment }: Props) {
  return (
    <Modal
      className="styled_modal_comment"
      title={title}
      visible={visible}
      onOk={() => {
        // TODO: get rid of getElementById
        const input = document.getElementById('comment_text_area') as HTMLInputElement
        onOk(input?.value)
      }}
      onCancel={onCancel}
      okText="Post"
      cancelText="Cancel"
      centered
      closable={false}
      destroyOnClose
      style={{ maxWidth: '400px' }}
    >
      <Input.TextArea
        id="comment_text_area"
        autoSize={{ minRows: 4, maxRows: 4 }}
        rows={4}
        defaultValue={defaultComment}
      />
    </Modal>
  )
}
