import { Tag, Typography } from 'antd'
import React, { useCallback, useState } from 'react'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'
import Gallery from 'react-photo-gallery'
import * as Showdown from 'showdown'
import { Employee, Post, Tag as TagType } from '../../types'
import EmployeeLink from './EmployeeLink'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import PATHS from '../../paths'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const { Text, Title, Paragraph } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
  tags?: Pick<TagType, 'id' | 'name' | 'description'>[]
}

interface Props extends RouteComponentProps {
  post: PostPick
  edit?: any
}

function PostItem({ post, edit, history }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <Text>
        {post.createdAt} {edit}
      </Text>
      <Title level={3} style={{ marginTop: 8 }}>
        {post.title}
      </Title>
      <div
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(post.body),
        }}
      />

      {post.tags && (
        <Paragraph>
          {post.tags?.map(tag => (
            <Tag
              key={tag.id}
              color="blue"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push({
                  pathname: PATHS.POSTS,
                  search: '?tag=' + tag.name,
                })
              }}
            >
              {tag.name}
            </Tag>
          ))}
        </Paragraph>
      )}
      <div style={{ maxWidth: 700 }}>
        <Gallery
          onClick={openLightbox}
          photos={post.images.map(image => ({
            src: image.url,
            width: 4,
            height: 3,
          }))}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={post.images.map(x => ({
                  source: x.url,
                  caption: x.fileName,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
      <EmployeeLink employee={post.createdBy} />
    </>
  )
}

export default withRouter(PostItem)
