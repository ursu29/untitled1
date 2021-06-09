import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import styled from 'styled-components'

const Wrapper = styled.div<{ short?: boolean }>`
  max-width: 100%;
  img {
    max-width: 100%;
    padding: 8px 0;
  }
  & .editor-toolbar.fullscreen {
    z-index: 20;
  }
  .CodeMirror,
  .CodeMirror-scroll {
    min-height: ${props => (props.short ? '150px' : '300px')};
  }
  .CodeMirror-sizer {
    min-height: ${props => (props.short ? '150px !important' : '300px !important')};
    max-height: 70vh;
  }
`

interface Props {
  id: string
  editorValue?: string
  concatValue?: string
  short?: boolean
  onChange?: (value: any) => void
}

export default class MarkdownEditor extends Component<Props> {
  simplemde: any
  componentDidMount() {
    const { editorValue, onChange } = this.props
    const element = document.getElementById(this.props.id)
    if (element) {
      this.simplemde = new SimpleMDE({
        element,
        showIcons: [
          'heading-1',
          'heading-2',
          'heading-3',
          'table',
          'strikethrough',
          'code',
          'horizontal-rule',
        ],
        spellChecker: false,
      })
      let simplemde = this.simplemde
      if (editorValue) {
        simplemde.value(editorValue)
      }
      simplemde.codemirror.on('change', function () {
        onChange?.(simplemde.value())
      })
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.simplemde) {
      if (this.props.editorValue) {
        if (this.props.editorValue !== this.simplemde.value()) {
          this.simplemde.value(this.props.editorValue)
        }
      }
      if (this.props.concatValue && this.props.concatValue !== prevProps.concatValue) {
        this.simplemde.value(this.simplemde.value() + '\n' + this.props.concatValue)
      }
    }
  }

  render() {
    return (
      <Wrapper short={this.props.short}>
        <textarea id={this.props.id}></textarea>
      </Wrapper>
    )
  }
}
