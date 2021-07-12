import { PlusOutlined, TableOutlined } from '@ant-design/icons'
import { User } from '@microsoft/microsoft-graph-types'
import { Button, Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import usePromise from 'react-fetch-hook/usePromise'
import GraphAPI from '../../../utils/GraphAPI'
import DrawerColumns, { allColumns } from './DrawerColumns'
import DrawerUser from './DrawerUser'

const graphAPI = new GraphAPI()

export default function Users() {
  const [drawer, setDrawer] = useState<{
    key?: 'columns' | 'newUser' | 'editUser'
    user?: User
  }>({})
  const [users, setUsers] = useState<User[] | undefined>([])
  const [selectedColumns, setSelectedColumns] = useState([''])
  const [shownColumns, setShownColumns] = useState<typeof allColumns>(allColumns.slice(0, 2))

  const { isLoading, data } = usePromise(() => graphAPI.getUsers())
  const { data: groupsData } = usePromise(() => graphAPI.getGroups())

  useEffect(() => {
    if (!isLoading && !!data) setUsers(data)
  }, [isLoading, data])

  const groups = groupsData?.sort((a, b) =>
    (a?.description || '').localeCompare(b?.description || ''),
  )

  const getUpdatedUsers = async (newUsersIds: string[]) => {
    const updatedUsers = await graphAPI.getUsers(newUsersIds)
    if (!!updatedUsers.length && !!users) {
      setUsers(users.map(user => updatedUsers.find(e => e.id === user.id) || user))
    }
    return updatedUsers
  }

  const getCreatedUser = async (newUsersId: string) => {
    const createdUser = (await graphAPI.getUsers([newUsersId]))[0]
    if (!!createdUser && !!users) {
      setUsers(users.concat([createdUser]))
    }
    return createdUser
  }

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

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //   },
  // }

  return (
    <>
      <div style={{ margin: '-8px 0 8px 8px' }}>
        <Button type="text" icon={<PlusOutlined />} onClick={() => tableMenuClick('new')}>
          New user
        </Button>
        {/* <Button type="text" icon={<EditOutlined />} onClick={() => tableMenuClick('edit')}>
          Edit
        </Button> */}
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
        /*         rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }} */
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
        groups={groups}
        visible={drawer.key === 'editUser' || drawer.key === 'newUser'}
        type={drawer.key === 'newUser' ? 'new' : 'edit'}
        handleClose={() => {
          setDrawer({})
        }}
        handleReopen={(user: User | undefined) => {
          setDrawer({})
          if (!user) return
          setTimeout(() => {
            setDrawer({
              key: 'editUser',
              user,
            })
          }, 700)
        }}
        getUpdatedUsers={getUpdatedUsers}
        getCreatedUser={getCreatedUser}
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
