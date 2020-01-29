import React, { useState } from 'react'
import { Modal, Typography, Switch } from 'antd'
import * as Showdown from 'showdown'
import { Post } from '../../types'
import Gallery from '../UI/Gallery'

const { Title } = Typography

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

type PostPick = Partial<
  Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'titleTranslated' | 'isTranslated'> & {
    tags: any
    images: any
  }
>

interface Props {
  handlePublish: () => void
  handleReturn: () => void
  visible: boolean
  post: PostPick
}

function PostPreview({ handlePublish, post, handleReturn, visible }: Props) {
  const [showTranslated, setTranslated] = useState(false)
  return (
    <div>
      <Modal
        okText="Publish"
        width={1000}
        centered
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        title={
          <div>
            Preview{' '}
            {post.isTranslated && (
              <Switch
                checkedChildren="En"
                unCheckedChildren="Ru"
                onChange={() => setTranslated(!showTranslated)}
                style={{ marginLeft: 8 }}
                checked={showTranslated}
              />
            )}
          </div>
        }
        visible={visible}
        onOk={handlePublish}
        onCancel={handleReturn}
      >
        <>
          <Title level={4}>{showTranslated ? post.titleTranslated : post.title}</Title>
          <div
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml((showTranslated ? post.bodyTranslated : post.body) || ''),
            }}
          ></div>
          <Gallery
            images={
              post.images
                ?.filter((x: any) => x.url || x.response?.[0]?.url)
                .map((image: any) => {
                  return {
                    id: image.id,
                    url: image.url || image.response?.[0]?.url,
                  }
                }) || []
            }
          />
        </>
      </Modal>
    </div>
  )
}

export default PostPreview