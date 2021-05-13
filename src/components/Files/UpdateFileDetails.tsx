import { useMutation } from "@apollo/client";
import React from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import FileForm from './FileForm'
import {
  updateFileDetails,
  UpdateFileDetailsMutation,
  UpdateFileDetailsMutationInput,
} from '../../queries/updateFileDetails'
import message from '../../message'

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
                const cacheId = `AzureFile:${file.id}`
                if (data) {
                  cache.writeData({
                    id: cacheId,
                    data: { details: data.updateFileDetails },
                  })
                }
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
