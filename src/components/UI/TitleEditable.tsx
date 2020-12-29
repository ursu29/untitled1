import React, { useState } from 'react'
import { Typography } from 'antd'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import Button from '../UI/Button'
import Input from '../UI/Input'

interface Props {
  data: string
  editable?: boolean
  handleSave: (title: string) => void
  emptyValue?: string
}

export default function TitleEditable({ data, editable, handleSave, emptyValue }: Props) {
  const [isEditing, toggleIsEditing] = useState(false)
  const [titleInput, setTitleInput] = useState(data)

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
        <Typography.Title style={{ marginRight: '10px', marginBottom: 0 }}>{data}</Typography.Title>
      )}
      {editable && (
        <Button
          size="small"
          icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
          type="link"
          onClick={() => {
            if (isEditing && titleInput !== data) {
              handleSave(titleInput.trim() ? titleInput.trim() : emptyValue ? emptyValue : '')
            }
            toggleIsEditing(!isEditing)
          }}
        />
      )}
    </div>
  )
}
