import React, { useState, useEffect } from 'react'
import { Typography, Popconfirm } from 'antd'
import Button from '../UI/Button'
import MarkdownEditor from '../UI/MarkdownEditor'
import markdownToHtml from '../../utils/markdownToHtml'

interface Props {
  data: string
  editable?: boolean
  handleSave: Function
  onEdit?: Function
}

export default function MarkdownEditable({ data, editable, handleSave }: Props) {
  const [isEditing, toggleIsEditing] = useState(false)
  const [descriptionMarkdown, setDescriptionMarkdown] = useState(data)

  const isTouched = descriptionMarkdown !== data

  // Add event listener on back button push
  useEffect(() => {
    const pushBackButton = (e: any) => toggleIsEditing(!isEditing)
    document.getElementById('back-button')?.addEventListener('click', pushBackButton, false)
    return () => window.removeEventListener('click', pushBackButton)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isEditing ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: '30px',
        width: 'fit-content',
        maxWidth: '96%',
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
            toggleIsEditing(!isEditing)
          }}
          style={{ marginLeft: '10px' }}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex' }}>
      <Typography.Paragraph style={{ marginBottom: '30px', maxWidth: '96%' }}>
        {data ? (
          <div
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
          onClick={() => toggleIsEditing(!isEditing)}
        />
      )}
    </div>
  )
}
