import React, { useState } from 'react'
import { Typography, Input } from 'antd'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import Button from '../UI/Button'

interface Props {
  description: string
  handleSave: Function
}

export default function GuildDescription({ description, handleSave }: Props) {
  const [isEditing, toggleIsEditing] = useState(false)
  const [descriptionInput, setDescriptionInput] = useState(description)

  return (
    <div style={{ marginBottom: '20px', overflowWrap: 'anywhere' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
          <Input.TextArea
            value={descriptionInput}
            onChange={e => setDescriptionInput(e.target.value)}
            maxLength={285}
            style={{
              fontSize: '13px',
              height: '70px',
              maxHeight: '70px',
              marginRight: '10px',
            }}
          />
        ) : (
          <Typography.Paragraph style={{ marginRight: '10px', marginBottom: 0 }}>
            {description || (
              <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>
                (brief description for the card on the guilds page)
              </span>
            )}
          </Typography.Paragraph>
        )}

        <Button
          size="small"
          icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
          type="link"
          onClick={() => {
            if (isEditing && descriptionInput !== description) {
              handleSave({ shortDescription: descriptionInput.trim() })
            }
            toggleIsEditing(!isEditing)
          }}
        />
      </div>

      {isEditing && (
        <span style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.45)', marginLeft: '5px' }}>
          {descriptionInput?.length || 0} out of 285...
        </span>
      )}
    </div>
  )
}
