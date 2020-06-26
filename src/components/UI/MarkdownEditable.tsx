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

  return isEditing ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: '30px',
        width: 'fit-content',
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
            handleSave(descriptionMarkdown)
            toggleIsEditing(!isEditing)
          }}
          style={{ marginLeft: '10px' }}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div>
      {editable && (
        <Button
          size="small"
          type="link"
          style={{ padding: 0 }}
          onClick={() => toggleIsEditing(!isEditing)}
        >
          (edit)
        </Button>
      )}
      <Typography.Paragraph style={{ marginBottom: '30px' }}>
        {data ? (
          <div
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(data),
            }}
          />
        ) : (
          <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>(description)</span>
        )}
      </Typography.Paragraph>
    </div>
  )
}
