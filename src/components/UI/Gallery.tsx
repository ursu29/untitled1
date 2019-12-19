import React, { useState, useCallback, useEffect } from 'react'
import { File } from '../../types'
import Gallery from 'react-photo-gallery'
import { Skeleton } from 'antd'

//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'

type GalleryImage = {
  src: string
  width: number
  height: number
}

class ImageSize extends React.Component<{
  url: string
  onLoad: (image: GalleryImage) => void
}> {
  constructor(props: any) {
    super(props)
  }

  shouldComponentUpdate(props: any) {
    if (props.url !== this.props.url) return true
    return false
  }

  handleSize(image: any) {
    this.props.onLoad({
      src: this.props.url,
      width: image?.offsetWidth || 4,
      height: image?.offsetHeight || 3,
    })
  }

  render() {
    return React.createElement('img', {
      src: this.props.url,
      onLoad: ({ target }) => {
        this.handleSize(target)
      },
    })
  }
}

interface Props {
  images: File[]
}

export default function PortalGallery({ images }: Props) {
  const [renderImages, setRenderImages] = useState<GalleryImage[]>([])
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

  useEffect(() => {
    setRenderImages([])
  }, [images])

  return (
    <>
      {renderImages.length !== images.length && (
        <div style={{ paddingBottom: 8 }}>
          <div style={{ position: 'fixed', right: '0', visibility: 'hidden' }}>
            {images.map(image => (
              <ImageSize
                key={image.id}
                url={image.url}
                onLoad={renderImage => {
                  setRenderImages([...renderImages, renderImage])
                }}
              />
            ))}
          </div>
          <Skeleton
            active
            loading
            title={false}
            paragraph={{
              rows: 2,
            }}
          />
        </div>
      )}

      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map(x => ({
                source: x.url,
                caption: x.fileName,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      {renderImages.length === images.length && (
        <div>
          <Gallery targetRowHeight={200} onClick={openLightbox} photos={renderImages} />
        </div>
      )}
    </>
  )
}
