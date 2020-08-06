import { Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { NEWS_FEED_WIDTH } from '../../config'
import Post from './Post'

const Wrapper = styled.div`
  img {
    max-width: 100%;
    padding: 8px 0;
  }
`

interface Props {
  handlePublish: () => void
  handleReturn: () => void
  visible: boolean
  post: any
}

function PostPreview({ handlePublish, post, handleReturn, visible }: Props) {
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
      <Wrapper>
        <Post isPreview post={post} />
      </Wrapper>
    </Modal>
  )
}

export default PostPreview
