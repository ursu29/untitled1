import { Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { NEWS_FEED_WIDTH } from '../../config'

const Wrapper = styled.div`
  img {
    max-width: 100%;
    padding: 8px 0;
  }
`

type Props = React.PropsWithChildren<{
  handlePublish: () => void
  handleReturn: () => void
  visible: boolean
}>

function PostPreview({ children, handlePublish, handleReturn, visible }: Props) {
  return (
    <Modal
      okText="Publish"
      width={NEWS_FEED_WIDTH}
      centered
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      title={<div>Preview</div>}
      visible={visible}
      onOk={handlePublish}
      onCancel={handleReturn}
    >
      <Wrapper>{children}</Wrapper>
    </Modal>
  )
}

export default PostPreview
