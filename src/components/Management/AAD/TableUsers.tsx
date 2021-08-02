import { Group, User } from '@microsoft/microsoft-graph-types'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import GraphAPI from '../../../utils/GraphAPI'
import DrawerColumns from './DrawerColumns'
import DrawerUser from './DrawerUser'
import { allUserColumns } from './columns'
import TableHeader from './TableHeader'

const graphAPI = new GraphAPI()

export default function Users({
  users: usersData,
  groups,
  isLoading,
  createAccess,
}: {
  users: User[] | undefined
  groups: Group[] | undefined
  isLoading: boolean
  createAccess: boolean
}) {
  const [drawer, setDrawer] = useState<{
    key?: 'columns' | 'newUser' | 'editUser'
    user?: User
  }>({})
  const [users, setUsers] = useState<User[] | undefined>([])
  const [filters, setFilters] = useState<{ [key: string]: any }>({})
  const [selectedColumns, setSelectedColumns] = useState([''])
  const [shownColumns, setShownColumns] = useState<typeof allUserColumns>(
    allUserColumns.slice(0, 2),
  )

  useEffect(() => {
    if (!isLoading && !!usersData) setUsers(usersData)
  }, [isLoading, usersData])

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
    return
  }

  const filteredUsers = users?.filter(e => {
    let pass = true
    if (filters.search)
      pass =
        e.displayName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.userPrincipalName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        false

    return pass
  })

  return (
    <>
      <TableHeader
        newButtonText="New User"
        newButtonOnClick={() => tableMenuClick('new')}
        columnsButtonClick={() => tableMenuClick('columns')}
        onSearch={e => {
          setFilters({ ...filters, search: e.target.value })
        }}
        createAccess={createAccess}
      />

      <Table
        loading={isLoading}
        tableLayout="fixed"
        dataSource={filteredUsers}
        pagination={false}
        columns={shownColumns}
        rowKey="id"
        size="small"
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
        columns={allUserColumns}
        visible={drawer.key === 'columns'}
        selectedColumns={shownColumns?.map((e: any) => e.key) || []}
        setSelectedColumns={(columns: string[]) => {
          setSelectedColumns(columns)
        }}
        handleOk={() => {
          setShownColumns(allUserColumns.filter(e => selectedColumns?.includes(e.key)))
        }}
        handleClose={() => {
          setDrawer({})
        }}
      />
    </>
  )
}
