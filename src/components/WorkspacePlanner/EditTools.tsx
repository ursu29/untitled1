import React, { useState } from 'react'
import { Upload, Button, Switch, Space, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
  isDesignMode: boolean
  toggleDesignMode: any
  onWorkplaceAdd: any
}

export default function EditTools({ isDesignMode, toggleDesignMode, onWorkplaceAdd }: Props) {
  const [fileList, updateFileList] = useState([])
  const uploadProps = {
    fileList,
    beforeUpload: (file: any) => {
      const acceptableTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg']
      if (!acceptableTypes.includes(file.type)) {
        message.error(`Only next formats allowed: png/jpg/jpeg/svg`)
      }
      return true
    },
    onChange: (info: any) => {
      console.log(info.fileList)
      updateFileList(info.fileList.filter((file: any) => !!file.status))
    },
  }

  return (
    <div style={{ padding: '5px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '5px' }}>Design Mode</label>
        <Switch checked={isDesignMode} onChange={() => toggleDesignMode(!isDesignMode)} />
      </div>

      {isDesignMode && (
        <div>
          <Button type="default" onClick={() => onWorkplaceAdd()}>
            Add Workplace
          </Button>
          <Upload showUploadList={false} {...uploadProps}>
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
        </div>
      )}
    </div>
  )
}
