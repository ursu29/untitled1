import React from 'react'
import { GATEWAY } from '../../config'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Compressor from 'compressorjs'

let currentUrl = ''

const DEFAULT_MAX_WIDTH = 1920
const DEFAULT_MAX_HEIGHT = 1920

interface Props {
  onChange: (img: any) => void
  name?: string
  quality?: number
  maxWidth?: number
  maxHeight?: number
}

export const ImageUploader: React.FC<Props> = ({
  onChange,
  name = 'files',
  quality = 0.8,
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  ...restProps
}) => {
  return (
    <Upload
      action={GATEWAY + '/upload'}
      name={name}
      multiple
      listType="picture"
      beforeUpload={file =>
        new Promise(resolve => {
          new Compressor(file, {
            quality,
            maxWidth,
            maxHeight,
            success: compressedResult => {
              resolve(compressedResult)
            },
          })
        })
      }
      onChange={onChange}
      previewFile={() => Promise.resolve().then(() => currentUrl)}
      {...restProps}
    >
      <Button>
        <UploadOutlined /> Upload Photos
      </Button>
    </Upload>
  )
}
