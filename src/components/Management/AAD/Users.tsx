import React, { useState } from 'react'
import { azureClient } from '../../App/Oauth'
import { User } from '@microsoft/microsoft-graph-types'
import usePromise from 'react-fetch-hook/usePromise'
import { Table, Button, Divider } from 'antd'
import { TableOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import DrawerColumns from './DrawerColumns'
import DrawerUser from './DrawerUser'
import { allColumns } from './DrawerColumns'

export default function Users() {
  const [drawer, setDrawer] = useState<{
    key?: 'columns' | 'newUser' | 'editUser'
    user?: User
  }>({})
  const [selectedColumns, setSelectedColumns] = useState([''])
  const [shownColumns, setShownColumns] = useState<typeof allColumns>(allColumns.slice(0, 2))

  const { isLoading, data } = usePromise(() =>
    // {isLoading, data, error}
    azureClient.api(`/users?$top=600&$select=id,${allColumns.map(e => e.key).join(',')}`).get(),
  )
  const users: User[] = data?.value

  const tableMenuClick = (key: 'new' | 'edit' | 'delete' | 'columns') => {
    switch (key) {
      case 'new':
        setDrawer({
          key: 'newUser',
        })
        break
      case 'columns':
        setDrawer({
          key: 'columns',
        })
        break
      default:
        return
    }

    if (key === 'columns') {
      setDrawer({
        key: 'columns',
      })
      return
    }

    return
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
  }

  return (
    <>
      <div>
        <Button type="text" icon={<PlusOutlined />} onClick={() => tableMenuClick('new')}>
          New user
        </Button>
        <Button type="text" icon={<EditOutlined />} onClick={() => tableMenuClick('edit')}>
          Edit
        </Button>
        <Button type="text" icon={<DeleteOutlined />} onClick={() => tableMenuClick('delete')}>
          Delete
        </Button>
        <Divider type="vertical" />
        <Button type="text" icon={<TableOutlined />} onClick={() => tableMenuClick('columns')}>
          Columns
        </Button>
      </div>

      <Table
        loading={isLoading}
        tableLayout="fixed"
        dataSource={users}
        pagination={false}
        columns={shownColumns}
        rowKey="id"
        size="small"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        onRow={record => ({
          onClick: () => {
            setDrawer({
              key: 'editUser',
              user: record,
            })
          },
        })}
        style={{ maxWidth: '100%', cursor: 'pointer' }}
      />

      <DrawerUser
        user={drawer.user}
        visible={drawer.key === 'editUser' || drawer.key === 'newUser'}
        type={drawer.key === 'newUser' ? 'new' : 'edit'}
        handleClose={() => {
          setDrawer({})
        }}
      />

      <DrawerColumns
        visible={drawer.key === 'columns'}
        selectedColumns={shownColumns?.map((e: any) => e.key) || []}
        setSelectedColumns={(columns: string[]) => {
          setSelectedColumns(columns)
        }}
        handleOk={() => {
          setShownColumns(allColumns.filter(e => selectedColumns?.includes(e.key)))
        }}
        handleClose={() => {
          setDrawer({})
        }}
      />
    </>
  )
}
