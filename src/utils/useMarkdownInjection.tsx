import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from 'antd'
import markdownToHtml from './markdownToHtml'

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
    }, delay || 0)
    // eslint-disable-next-line
  }, [trigger])
}
