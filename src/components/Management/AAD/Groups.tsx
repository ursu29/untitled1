import { Group, User } from '@microsoft/microsoft-graph-types'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import GraphAPI from '../../../utils/GraphAPI'
import DrawerColumns from './DrawerColumns'
import DrawerGroup from './DrawerGroup'
import { allGroupColumns } from './services'
import TableHeader from './TableHeader'

const graphAPI = new GraphAPI()

export default function Groups({
  users,
  groups: groupsData,
  isLoading,
}: {
  users: User[] | undefined
  groups: Group[] | undefined
  isLoading: boolean
}) {
  const [drawer, setDrawer] = useState<{
    key?: 'columns' | 'newGroup' | 'editGroup'
    group?: Group
  }>({})
  const [groups, setGroups] = useState<Group[] | undefined>([])
  const [filters, setFilters] = useState<{ [key: string]: any }>({})
  const [selectedColumns, setSelectedColumns] = useState([''])
  const [shownColumns, setShownColumns] = useState<typeof allGroupColumns>(
    allGroupColumns.slice(0, 2),
  )

  useEffect(() => {
    if (!isLoading && !!groupsData) setGroups(groupsData)
  }, [isLoading, groupsData])

  const getUpdatedGroups = async (newGroupsNames: string[]) => {
    const updatedGroups = await graphAPI.getGroups(newGroupsNames)
    if (!!updatedGroups.length && !!groups) {
      setGroups(groups.map(group => updatedGroups.find(e => e?.id === group?.id) || group))
    }
    return updatedGroups
  }

  const getCreatedGroup = async (newGroupDisplayName: string) => {
    const createdGroup = (await graphAPI.getGroups([newGroupDisplayName]))[0]
    if (!!createdGroup && !!groups) {
      setGroups(groups.concat([createdGroup]))
    }
    return createdGroup
  }

  const tableMenuClick = (key: 'new' | 'edit' | 'delete' | 'columns') => {
    switch (key) {
      case 'new':
        setDrawer({
          key: 'newGroup',
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

  const filteredGroups = groups?.filter(e => {
    let pass = true
    if (filters.search)
      pass =
        e.displayName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        e.mail?.toLowerCase().includes(filters.search.toLowerCase()) ||
        false

    return pass
  })

  return (
    <>
      <TableHeader
        newButtonText="New Group"
        newButtonOnClick={() => tableMenuClick('new')}
        columnsButtonClick={() => tableMenuClick('columns')}
        onSearch={e => {
          setFilters({ ...filters, search: e.target.value })
        }}
      />

      <Table
        loading={isLoading}
        tableLayout="fixed"
        dataSource={filteredGroups}
        pagination={false}
        columns={shownColumns}
        rowKey="id"
        size="small"
        onRow={record => ({
          onClick: () => {
            setDrawer({
              key: 'editGroup',
              group: record,
            })
          },
        })}
        style={{ maxWidth: '100%', cursor: 'pointer' }}
      />

      <DrawerGroup
        group={drawer.group}
        users={users}
        visible={drawer.key === 'editGroup' || drawer.key === 'newGroup'}
        type={drawer.key === 'newGroup' ? 'new' : 'edit'}
        handleClose={() => {
          setDrawer({})
        }}
        handleReopen={(group: Group | undefined) => {
          setDrawer({})
          if (!group) return
          setTimeout(() => {
            setDrawer({
              key: 'editGroup',
              group,
            })
          }, 700)
        }}
        getUpdatedGroups={getUpdatedGroups}
        getCreatedGroup={getCreatedGroup}
      />

      <DrawerColumns
        columns={allGroupColumns}
        visible={drawer.key === 'columns'}
        selectedColumns={shownColumns?.map((e: any) => e.key) || []}
        setSelectedColumns={(columns: string[]) => {
          setSelectedColumns(columns)
        }}
        handleOk={() => {
          setShownColumns(allGroupColumns.filter(e => selectedColumns?.includes(e.key)))
        }}
        handleClose={() => {
          setDrawer({})
        }}
      />
    </>
  )
}
