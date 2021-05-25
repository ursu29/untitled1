import React from 'react'
import message from '../../message'
import { SharedFileFragmentFragment } from '../../queries/getSharedFiles'
import { useUpdateFileDetailsMutation } from '../../queries/updateFileDetails'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import FileForm from './FileForm'

interface Props {
  file: SharedFileFragmentFragment
}

export const UpdateFileDetails = ({ file }: Props) => {
  const [updateFile, { loading }] = useUpdateFileDetailsMutation({
    onError: message.error,
    onCompleted: () => message.success('File is updated'),
  })
  return (
    <Drawer
      toggler={
        <Button type="link" size="small" style={{ paddingLeft: 0 }}>
          Edit
        </Button>
      }
      drawerLabel={file.fileName}
      content={
        <FileForm
          file={file}
          loading={loading}
          onSubmit={(values, reset) => {
            updateFile({
              variables: { input: values },
              update: () => {
                if (reset) {
                  reset()
                }
              },
            })
          }}
        />
      }
    />
  )
}
