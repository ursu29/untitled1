import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  img {
    max-width: 100%;
    padding: 8px 0;
  }
  & .editor-toolbar.fullscreen {
    z-index: 20;
  }
`

interface Props {
  id: string
  value: any
  onChange: (value: any) => void
}

export default class MarkdownEditor extends Component<Props> {
  simplemde: any
  componentDidMount() {
    const { value, onChange } = this.props
    const element = document.getElementById(this.props.id)
    if (element) {
      this.simplemde = new SimpleMDE({ element, spellChecker: false })
      let simplemde = this.simplemde
      if (value) {
        simplemde.value(value)
      }
      simplemde.codemirror.on('change', function() {
        if (value !== simplemde.value()) {
          onChange(simplemde.value())
        }
      })
    }
  }

  componentDidUpdate() {
    if (this.simplemde) {
      if (this.props.value) {
        if (this.props.value !== this.simplemde.value()) {
          this.simplemde.value(this.props.value)
        }
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <textarea id={this.props.id}></textarea>
      </Wrapper>
    )
  }
}