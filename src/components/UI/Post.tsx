import { Typography } from 'antd'
import React, { useState, useCallback } from 'react'
import * as Showdown from 'showdown'
import { Employee, Post, File } from '../../types'
import EmployeeLink from './EmployeeLink'
import styled from 'styled-components'
import Gallery from 'react-photo-gallery'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'

const Image = styled.img`
  max-width: 300px;
  max-height: 150px;
  margin-right: ${props => props.theme.padding + 'px'};
`

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const { Text, Title } = Typography

type PostPick = Pick<
  Post,
  'id' | 'title' | 'body' | 'bodyTranslated' | 'createdAt' | 'updatedAt' | 'images'
> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'>
}

interface Props {
  post: PostPick
}

export default function PostItem({ post }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    console.log('index', index)
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <Text>{post.createdAt}</Text>
      <Title level={3} style={{ marginTop: 8 }}>
        {post.title}
      </Title>
      <div
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(post.body),
        }}
      />
      <EmployeeLink employee={post.createdBy} />
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
    </>
  )
}
