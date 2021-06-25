import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import markdownToHtml from '../../utils/markdownToHtml'
import ReactDOM from 'react-dom'
import Image from '../Image'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

// Install modules
SwiperCore.use([Pagination])

const Wrapper = styled.div`
  ul,
  ol {
    margin-bottom: 1rem;
  }
  img {
    max-width: 100%;
    padding: 8px 0;
  }
`

type Props = {
  text?: string
}

function RichText({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = ref.current
    if (!wrapper) return
    const galleries = wrapper.getElementsByClassName('injected-image-gallery')
    if (galleries) {
      Array.from(galleries).forEach((gallery, index) => {
        const imgLinksList = gallery.innerHTML
          .split(',')
          .filter(i => i)
          .map(link => link.trim())
        ReactDOM.render(
          <Swiper spaceBetween={50} slidesPerView={1} pagination={{ type: 'bullets' }}>
            {imgLinksList.map(i => (
              <SwiperSlide key={i}>
                <Image className="gallery-image" src={i} alt={i} />
              </SwiperSlide>
            ))}
          </Swiper>,
          gallery,
        )
      })
    }

    const images = wrapper.getElementsByTagName('img')

    if (images) {
      Array.from(images).forEach(image => {
        if (image.className.includes('gallery-image')) return
        const temp = document.createElement('div')
        ReactDOM.render(<Image src={image.src} />, temp)
        const container = image.parentElement
        if (container) {
          container.replaceChild(temp, image)
        }
      })
    }
  }, [text])

  return (
    <Wrapper
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: text ? markdownToHtml(text) : '',
      }}
    />
  )
}

export default RichText
