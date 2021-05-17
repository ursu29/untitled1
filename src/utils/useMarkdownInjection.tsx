import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Table } from 'antd'
import markdownToHtml from './markdownToHtml'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from '../components/Image'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'

export default function useMarkdownInjection(trigger?: any, delay?: number) {
  useEffect(() => {
    setTimeout(() => {
      /**
       * COLLAPSE
       */
      const collapses = document.getElementsByClassName('md-injected-collapse')
      if (collapses) {
        Array.from(collapses).forEach(collapse => {
          let collapseList: { titles: string[]; bodies: string[] } = { titles: [], bodies: [] }

          try {
            collapseList = JSON.parse(collapse.innerHTML)
          } catch (err) {
            collapseList = { titles: ['ERROR'], bodies: [`Please check your syntax!\n\n${err}`] }
          }

          ReactDOM.render(
            <Collapse
              style={{ margin: '1rem 0 1rem 0', borderRadius: '8px' }}
              //@ts-ignore
              ghost={collapse.attributes['data-ghost']?.nodeValue === 'true'}
            >
              {collapseList.titles.map((title: string, i: number) => (
                <Collapse.Panel
                  header={title}
                  key={i + Math.random()}
                  style={{
                    borderRadius: i === collapseList.titles.length - 1 ? '8px' : 0,
                    width: '100%',
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(collapseList.bodies[i]),
                    }}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>,
            collapse,
          )
        })
      }

      /**
       * BLOCK
       */
      const blocks = document.getElementsByClassName('md-injected-block')
      if (blocks) {
        Array.from(blocks).forEach(block => {
          ReactDOM.render(
            <div
              dangerouslySetInnerHTML={{ __html: markdownToHtml(block.innerHTML) }}
              style={{
                //@ts-ignore
                backgroundColor: block.attributes['data-color']?.nodeValue || '',
                margin: '1rem 0 1rem 0',
                padding: '20px',
                paddingBottom: '6px',
                borderRadius: '8px',
              }}
            />,
            block,
          )
        })
      }

      /**
       * SPACE
       */
      const spaces = document.getElementsByClassName('md-injected-space')
      if (spaces) {
        Array.from(spaces).forEach(space => {
          ReactDOM.render(<div style={{ height: `${space.innerHTML}rem` }}></div>, space)
        })
      }

      /**
       * TABLE
       */
      const tables = document.getElementsByClassName('md-injected-table')
      if (tables) {
        Array.from(tables).forEach(table => {
          let tableRows: string[][] = []
          try {
            tableRows = JSON.parse(table.innerHTML)
          } catch (err) {
            tableRows = [[`ERROR! Please check your syntax!\n\n${err}`]]
          }
          const columns = tableRows[0].map((e, i) => ({
            title: e,
            dataIndex: 'column' + i,
            key: i,
          }))

          const data = tableRows.slice(1).map((row, rowI) =>
            row.reduce(
              (acc, col, i) => {
                acc['column' + i] = col
                return acc
              },
              { key: rowI } as any,
            ),
          )

          ReactDOM.render(<Table columns={columns} dataSource={data} pagination={false} />, table)
        })
      }

      /**
       * GALLERY
       */
      const galleries = document.getElementsByClassName('md-injected-gallery')
      if (galleries) {
        Array.from(galleries).forEach(gallery => {
          const imgLinksList = gallery.innerHTML
            .split(',')
            .filter(i => i)
            .map(link => link.trim())
          ReactDOM.render(
            <Swiper spaceBetween={50} slidesPerView={1} pagination={{ type: 'bullets' }}>
              {imgLinksList.map(i => (
                <SwiperSlide key={i} style={{ textAlign: 'center' }}>
                  <Image className="gallery-image" src={i} alt={i} style={{ maxHeight: '500px' }} />
                </SwiperSlide>
              ))}
            </Swiper>,
            gallery,
          )
        })
      }

      /**
       * IMAGE FROM STORAGE
       */
      const images = document.getElementById('markdown_editable')?.getElementsByTagName('img')
      if (images) {
        Array.from(images).forEach(image => {
          if (image.className.includes('gallery-image')) return
          var temp = document.createElement('div')
          ReactDOM.render(<Image src={image.src} style={{ maxHeight: '500px' }} />, temp)
          var container = image.parentElement
          if (container) {
            container.replaceChild(temp, image)
          }
        })
      }
    }, delay || 0)
    // eslint-disable-next-line
  }, [trigger])
}
