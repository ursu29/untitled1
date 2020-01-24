import { Input, List, Skeleton, Tag } from 'antd'
import React, { useState } from 'react'
import { Employee, File } from '../../types'

const { CheckableTag } = Tag

type FilesPick = Pick<File, 'id' | 'url' | 'fileName' | 'createdAt' | 'size' | 'type'> & {
  createdBy: Pick<Employee, 'id' | 'name' | 'email'> | null
}

interface Props {
  loading: boolean
  files?: FilesPick[]
}

const getFolderPath = (webUrl: string) => {
  return webUrl.slice(webUrl.indexOf('.com/') + '.com/'.length)
}

export default function({ files, loading }: Props) {
  const [filter, setFilter] = useState('')
  const [type, setType] = useState<File['type'] | null>(null)
  if (!loading && !files) return null
  const filteredByTypeFiles = (files || []).filter(item => {
    if (type === null) return true
    return item.type === type
  })

  const filteredFiles: FilesPick[] = (filteredByTypeFiles || []).filter(file => {
    return file.fileName?.toLowerCase().includes(filter.trim().toLowerCase())
  })

  return (
    <Skeleton loading={loading} active>
      <Input
        placeholder="Filter file"
        value={filter}
        onChange={(e: any) => setFilter(e.target.value)}
      />
      <div style={{ margin: '8px 0' }}>
        <CheckableTag checked={type === null} onChange={() => setType(null)}>
          All
        </CheckableTag>
        <CheckableTag checked={type === 'presentation'} onChange={() => setType('presentation')}>
          Presentations
        </CheckableTag>
        <CheckableTag checked={type === 'video'} onChange={() => setType('video')}>
          Videos
        </CheckableTag>
      </div>
      <List
        pagination={{
          pageSize: 25,
          hideOnSinglePage: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        dataSource={filteredFiles}
        renderItem={file => (
          <List.Item key={file.id}>
            <List.Item.Meta
              style={{ wordBreak: 'break-all' }}
              title={
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
              }
              description={
                <>
                  <div>
                    <span>From </span>
                    {decodeURI(getFolderPath(file.url))}
                  </div>
                  <div>
                    <span>Created {file.createdBy && <span>by {file.createdBy.name} </span>}</span>
                    {file.createdAt}.
                  </div>
                  <div>Size: {(file.size / 1000).toFixed(0)} KB</div>
                </>
              }
            />
          </List.Item>
        )}
      ></List>
    </Skeleton>
  )
}
