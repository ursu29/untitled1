import React, { useState, useEffect, useRef } from 'react'
import { Typography, Popconfirm } from 'antd'
import Button from '../UI/Button'
import MarkdownEditor from '../UI/MarkdownEditor'
import markdownToHtml from '../../utils/markdownToHtml'
import useMarkdownInjection from '../../utils/useMarkdownInjection'
import useMarkdownLinkClick from '../../utils/useMarkdownLinkClick'

import { RouteComponentProps, withRouter } from 'react-router-dom'

interface Props {
  data: string
  editable?: boolean
  handleSave: Function
  onEdit?: Function
}

function MarkdownEditable({ data, editable, handleSave, history }: Props & RouteComponentProps) {
  const [isEditing, toggleIsEditing] = useState(false)
  const [descriptionMarkdown, setDescriptionMarkdown] = useState(data)
  const [delay, setDelay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useMarkdownInjection(ref, delay, isEditing)
  useMarkdownLinkClick(history, 'markdown_editable')

  const isTouched = descriptionMarkdown !== data

  // Add event listener on back button push
  useEffect(() => {
    const pushBackButton = (e: any) => toggleIsEditing(false)
    document.getElementById('back-button')?.addEventListener('click', pushBackButton, false)
    return () => window.removeEventListener('click', pushBackButton)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isEditing ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '30px',
        width: '96%',
      }}
    >
      <MarkdownEditor
        id="markdownEditor"
        value={descriptionMarkdown}
        onChange={(value: any) => {
          setDescriptionMarkdown(value)
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <Popconfirm
          placement="topRight"
          title="Are you sure you want to CANCEL? Your changes will not be saved."
          onConfirm={() => {
            toggleIsEditing(!isEditing)
          }}
          okText="Yes"
          cancelText="No"
          disabled={!isTouched}
        >
          <Button
            onClick={() => (!isTouched ? toggleIsEditing(!isEditing) : null)}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Popconfirm>

        <Button
          disabled={!isTouched}
          onClick={() => {
            handleSave(descriptionMarkdown.trim())
            setDelay(600)
            toggleIsEditing(!isEditing)
          }}
          style={{ marginLeft: '10px' }}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div id="markdown_editable" style={{ display: 'flex' }}>
      <Typography.Paragraph style={{ marginBottom: '30px', width: '96%' }}>
        {data ? (
          <div
            ref={ref}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(data),
            }}
            style={{ maxWidth: '100%', overflowX: 'auto' }}
          />
        ) : (
          <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>(description)</span>
        )}
      </Typography.Paragraph>
      {editable && (
        <Button
          size="small"
          icon="edit"
          type="link"
          style={{ marginLeft: '10px' }}
          onClick={() => {
            setDelay(300)
            toggleIsEditing(!isEditing)
          }}
        />
      )}
    </div>
  )
}

export default withRouter(MarkdownEditable)
