import React from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import FileForm from './FileForm'
import { useMutation } from '@apollo/react-hooks'
import {
  fileDetailsFragment,
  updateFileDetails,
  UpdateFileDetailsMutation,
  UpdateFileDetailsMutationInput,
} from '../../queries/updateFileDetails'
import message from '../../message'
import { FileDetails } from '../../types'

interface Props {
  file: FilesPick
}

export const UpdateFileDetails = ({ file }: Props) => {
  const [updateFile, { loading }] = useMutation<
    UpdateFileDetailsMutation,
    UpdateFileDetailsMutationInput
  >(updateFileDetails, {
    onError: message.error,
    onCompleted: () => message.success('File is updated'),
    update: (cache, { data }) => {
      const cacheId = `FileDetails:${file.id}`
      const currentFile = cache.readFragment<FileDetails>({
        id: cacheId,
        fragment: fileDetailsFragment,
      })
      if (data && currentFile) {
        cache.writeData({
          id: cacheId,
          data: data.updateFileDetails,
        })
      }
    },
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
              update: reset,
            })
          }}
        />
      }
    />
  )
}
