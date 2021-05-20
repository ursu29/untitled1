import React from 'react'
import { SharedFileFragmentFragment } from '../../queries/getSharedFiles'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import FileForm from './FileForm'
import { useUpdateFileDetailsMutation } from '../../queries/updateFileDetails'
import message from '../../message'

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
              update: (cache, { data }) => {
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
