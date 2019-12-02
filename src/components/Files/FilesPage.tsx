import { useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import getSharedFiles, { QueryType } from '../../queries/getSharedFiles'
import PageContent from '../UI/PageContent'
import SharedFileList from '../UI/SharedFileList'

let timeout: any
let fileList: QueryType['sharedFiles'] | null = null

export default function FilesPage() {
  const { data, loading, error, refetch } = useQuery<QueryType>(getSharedFiles)

  const loadDelayed = () => {
    timeout = setTimeout(() => {
      refetch()
    }, 5000)
  }

  useEffect(() => {
    if (data) {
      if (!fileList || data.sharedFiles.length > fileList.length) {
        fileList = data.sharedFiles
        loadDelayed()
      }
    }

    return function cleanup() {
      clearTimeout(timeout)
    }
  })

  return (
    <PageContent>
      <SharedFileList loading={loading} files={data?.sharedFiles || []} />
    </PageContent>
  )
}
