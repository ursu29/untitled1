import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { Collapse, Input, Button, Popconfirm } from 'antd'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { getPaths, createWikiPage, removeWikiPage } from '../../queries/wiki'
import message from '../../message'

const VerticalLine = styled.div`
  height: 90%;
  width: 10px;
  border-left: 1px lightgray;
  margin-left: 5px;
  border-left-style: solid;
  position: absolute;
`

export default function PageScheme({
  paths,
  sectionPath,
  rootPath,
}: {
  paths: string[]
  sectionPath: string
  rootPath?: string
}) {
  const isSingleColumn = useMediaQuery({ maxWidth: 650 })
  const { Panel } = Collapse
  const [newPagePath, setNewPagePath] = useState('')

  // Create the new page
  const [update] = useMutation(createWikiPage, {
    onCompleted: () => message.success('Page has been created'),
    awaitRefetchQueries: true,
    refetchQueries: rootPath
      ? [{ query: getPaths, variables: { rootPath } }]
      : [{ query: getPaths }],
    onError: message.error,
  })

  // Delete the existing page
  const [remove] = useMutation(removeWikiPage, {
    onCompleted: () => message.success('Page has been removed'),
    awaitRefetchQueries: true,
    refetchQueries: rootPath
      ? [{ query: getPaths, variables: { rootPath } }]
      : [{ query: getPaths }],
    onError: message.error,
  })

  return (
    <Collapse bordered={false} style={{ width: '100%' }}>
      <Panel header="manage pages" key="1" style={{ border: 0 }}>
        <div style={{ position: 'relative' }}>
          <VerticalLine></VerticalLine>
          <div style={{ marginLeft: '25px' }}>
            {paths
              .slice()
              .sort()
              .map(path => (
                <div key={path} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      maxWidth: '60%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <Link to={path}>{path}</Link>
                  </div>
                  <Popconfirm
                    placement="right"
                    title={'Are you sure you want to remove that page?'}
                    onConfirm={() => remove({ variables: { input: { path } } })}
                    okText="Yes"
                    cancelText="No"
                  >
                    <CloseOutlined
                      style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '10px' }}
                    />
                  </Popconfirm>
                </div>
              ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: isSingleColumn ? 'column' : 'row',
              marginTop: '15px',
            }}
          >
            <div style={{ width: '100%', minWidth: '210px' }}>
              <Input
                addonBefore={sectionPath + '/'}
                placeholder="path"
                onChange={e => setNewPagePath(e.target.value)}
              />
            </div>

            <div>
              <Button
                style={{
                  marginLeft: isSingleColumn ? 0 : '20px',
                  marginTop: isSingleColumn ? '10px' : 0,
                }}
                onClick={() =>
                  update({
                    variables: {
                      input: { path: `${sectionPath}${newPagePath ? '/' + newPagePath : ''}` },
                    },
                  })
                }
              >
                Create page
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  )
}
