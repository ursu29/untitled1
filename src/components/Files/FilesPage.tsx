import { useQuery } from "@apollo/client";
import React, { useEffect } from 'react'
import getSharedFiles, { QueryType } from '../../queries/getSharedFiles'
import PageContent from '../UI/PageContent'
import SharedFileList from './SharedFileList'
import message from '../../message'

export default function FilesPage() {
  const { data, loading, startPolling, stopPolling } = useQuery<QueryType>(getSharedFiles, {
    onError: message.error,
  })
  const hasMore = data?.sharedFiles.hasMore || false
  const files = data?.sharedFiles.files || []

  useEffect(() => {
    if (hasMore) {
      startPolling(5000)
      return () => stopPolling()
    }
  }, [hasMore, startPolling, stopPolling])

  return (
    <PageContent style={{ padding: 0 }}>
      <SharedFileList loading={loading} hasMore={hasMore} files={files} />
    </PageContent>
  )
}
