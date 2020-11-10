import React from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import FileForm from './FileForm'

interface Props {
  file: FilesPick
}

export const UpdateFile = ({ file }: Props) => {
  return (
    <Drawer
      toggler={
        <Button type="link" size="small" style={{ paddingLeft: 0 }}>
          Edit
        </Button>
      }
      drawerLabel={file.fileName}
      content={<FileForm file={file} />}
    />
  )
}
