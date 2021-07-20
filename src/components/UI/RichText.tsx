import React, { useRef } from 'react'
import styled from 'styled-components'
import markdownToHtml from '../../utils/markdownToHtml'
import useMarkdownInjection from '../../utils/useMarkdownInjection'

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
  className?: string
  text?: string
}

function RichText({ className, text }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useMarkdownInjection(ref, 0, text)

  return (
    <Wrapper
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{
        __html: text ? markdownToHtml(text) : '',
      }}
    />
  )
}

export default RichText
