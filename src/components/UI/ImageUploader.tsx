import React from 'react'
import { GATEWAY } from '../../config'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

let currentUrl = ''

const DEFAULT_MAX_WIDTH = 1900
const DEFAULT_MAX_HEIGHT = 1900

interface Props {
  onChange: (img: any) => void
  name?: string,
  quality?: number,
  maxWidth?: number,
  maxHeight?: number,
}

export const ImageUploader: React.FC<Props> = (
  {
    onChange,
    name = 'files',
    quality = .7,
    maxWidth = DEFAULT_MAX_WIDTH,
    maxHeight = DEFAULT_MAX_HEIGHT,
    ...restProps
  },
) => {
  return (
    <Upload
      action={GATEWAY + '/upload'}
      name={name}
      multiple
      listType='picture'
      beforeUpload={file => {
        return new Promise((resolve: any) => {
          const reader: any = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const img = new Image()
            img.src = reader.result
            img.onload = async () => {
              const canvas = document.createElement('canvas')
              const [newWidth, newHeight] = calculateImageSize(img, maxWidth, maxHeight)
              canvas.width = newWidth
              canvas.height = newHeight
              const ctx = canvas.getContext('2d')
              if (ctx) {
                ctx.drawImage(img, 0, 0, newWidth, newHeight)
                canvas.toBlob(resolve, 'image/jpeg', quality)
              } else {
                resolve(false)
              }
            }
          }
        })
      }}
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

function calculateImageSize(img: any, maxWidth: number, maxHeight: number) {
  let width = img.width
  let height = img.height

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width)
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height)
      height = maxHeight
    }
  }
  return [width, height]
}