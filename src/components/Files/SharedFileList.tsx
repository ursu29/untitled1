import { Input, Skeleton, Tag, Tree } from 'antd'
import React, { useState } from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import { FileList } from './FileList'

const { CheckableTag } = Tag

interface Props {
  loading: boolean
  files?: FilesPick[]
}

export default function ({ files, loading }: Props) {
  const [chosenFiles, setChosenFiles]: any = useState([])
  const [filter, setFilter] = useState('')
  const [type, setType] = useState<FilesPick['type'] | 'folders' | null>('folders')

  if (!loading && !files) return null

  const filteredByTypeFiles = (files || []).filter(item => {
    if (type === null || type === 'folders') return true
    return item.type === type
  })

  const filteredFiles: FilesPick[] = (filteredByTypeFiles || []).filter(file => {
    return file.fileName?.toLowerCase().includes(filter.trim().toLowerCase())
  })

  // Define folder for paths
  const treeFolder = {}
  const flatPathsList: string[] = []

  // Parse files paths to define folders
  filteredFiles.forEach(file => {
    const path = file.url
      .match(/shared%20documents\/Guilds\/.*/i)?.[0]
      .replace(/shared%20documents\/Guilds\//i, '')
    if (path) flatPathsList.push(`Guilds/${path}`)
  })

  // Recursive function for building nested object with full folder structure
  const buildNestedFolder = (source: string, target: string) => {
    const elements = source.split('/')
    const element = elements.shift()
    //@ts-ignore
    target[element] = target[element] || element
    if (elements.length) {
      //@ts-ignore
      target[element] = typeof target[element] === 'object' ? target[element] : {}
      //@ts-ignore
      buildNestedFolder(elements.join('/'), target[element])
    }
  }

  // Build nested object
  //@ts-ignore
  flatPathsList.forEach(item => buildNestedFolder(item, treeFolder))

  // Recursive function for building list for tree comp using from object
  const buildNestedFolderList = (source: any, parentKey = '') => {
    const dirs = Object.keys(source).filter(key => typeof source[key] === 'object')
    const leafs = Object.keys(source).filter(key => typeof source[key] !== 'object')

    const treeFromList = (list: any, isLeaf = false) =>
      list
        .sort((a: any, b: any) => (a > b ? 1 : -1))
        .map((key: any) => ({
          title: decodeURI(key),
          key: parentKey + key + (isLeaf ? '' : '/'),
          children: !isLeaf ? buildNestedFolderList(source[key], parentKey + key + '/') : null,
          isLeaf,
        }))

    return treeFromList(dirs).concat(treeFromList(leafs, true))
  }

  // Build list
  const treeFolderList = buildNestedFolderList(treeFolder)

  // Click on folder
  const onSelect = (keys: any, event: any) => {
    const isLeaf = !event.node?.children?.length
    if (isLeaf) {
      setChosenFiles([
        {
          children: null,
          isLeaf: true,
          key: event.node.key,
          title: event.node.title,
        },
      ])
      return
    }
    const files = event.node.children.filter((e: any) => e.isLeaf)
    setChosenFiles(files)
  }

  return (
    <Skeleton loading={loading} active>
      <Input
        placeholder="Filter file"
        value={filter}
        onChange={(e: any) => setFilter(e.target.value)}
      />
      <div style={{ margin: '8px 0' }}>
        <CheckableTag checked={type === 'folders'} onChange={() => setType('folders')}>
          Folders
        </CheckableTag>
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

      {type === 'folders' ? (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div
            style={{
              width: '40%',
              maxHeight: '800px',
              overflow: 'auto',
            }}
          >
            <Tree.DirectoryTree
              multiple
              onSelect={onSelect}
              treeData={treeFolderList}
              style={{ width: '100%' }}
            />
          </div>
          <div
            style={{
              width: '60%',
              marginLeft: '20px',
              paddingLeft: '20px',
              borderLeft: '1px solid #f0f0f0',
            }}
          >
            <FileList
              files={filteredByTypeFiles.filter(e =>
                chosenFiles.some((chosenFile: any) => e.url.includes(chosenFile.key)),
              )}
            />
          </div>
        </div>
      ) : (
        <FileList files={filteredFiles} detailed />
      )}
    </Skeleton>
  )
}
