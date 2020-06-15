import React, { useState } from 'react'
import { Typography } from 'antd'
import Button from '../UI/Button'
import Input from '../UI/Input'

interface Props {
  title: string
  editable?: boolean
  handleSave: Function
}

export default function GuildTitle({ title, editable, handleSave }: Props) {
  const [isEditing, toggleIsEditing] = useState(false)
  const [titleInput, setTitleInput] = useState(title)

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
      {isEditing ? (
        <Input
          value={titleInput}
          onChange={e => setTitleInput(e)}
          style={{
            fontSize: '38px',
            width: 'fit-content',
            height: 'auto',
            marginRight: '10px',
          }}
        />
      ) : (
        <Typography.Title style={{ marginRight: '10px', marginBottom: 0 }}>
          {title}
        </Typography.Title>
      )}
      {editable && (
        <Button
          size="small"
          icon={isEditing ? 'check' : 'edit'}
          type="link"
          onClick={() => {
            if (isEditing && titleInput !== title) {
              handleSave({ title: titleInput })
            }
            toggleIsEditing(!isEditing)
          }}
        />
      )}
    </div>
  )
}
