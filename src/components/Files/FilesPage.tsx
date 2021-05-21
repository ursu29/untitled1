import React from 'react'
import { useSharedFilesQuery } from '../../queries/getSharedFiles'
import PageContent from '../UI/PageContent'
import SharedFileList from './SharedFileList'
import message from '../../message'

export default function FilesPage() {
  const { data, loading } = useSharedFilesQuery({
    onError: message.error,
  })
  const files = data?.sharedFiles || []

  return (
    <PageContent style={{ padding: 0 }}>
      <SharedFileList loading={loading} files={files} />
    </PageContent>
  )
}
