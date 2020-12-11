import React, { useState } from 'react'
import BookmarkItem from './Bookmark'
import { Employee, Access, Bookmark } from '../../types'
import { List, Input, Skeleton } from 'antd'
import { PureQueryOptions } from 'apollo-client'

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link'> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  access: Pick<Access, 'write'>
}

interface Props {
  loading: boolean
  bookmarks?: BookmarkPick[]
  UpdateBookmark: React.FC<any>
  DeleteBookmark: React.FC<any>
  LikeBookmark: React.FC<any>
  createBookmark: any
  refetchQueries?: PureQueryOptions[]
}

export default function BookmarksList({
  loading,
  bookmarks,
  createBookmark,
  UpdateBookmark,
  DeleteBookmark,
  LikeBookmark,
  refetchQueries,
}: Props) {
  const [filter, setFilter] = useState('')

  if (!loading && !bookmarks) {
    return <div>No bookmarks found</div>
  }

  const filteredItems: BookmarkPick[] = (bookmarks || []).filter(bookmark => {
    return bookmark.title?.toLowerCase().includes(filter.trim().toLowerCase())
  })

  return (
    <Skeleton loading={loading} active>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <Input
          placeholder="Search"
          onChange={(e: any) => setFilter(e.target.value)}
          value={filter}
        />
        {createBookmark && <div style={{ marginLeft: 8 }}>{createBookmark}</div>}
      </div>
      <List
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        dataSource={filteredItems}
        renderItem={item => {
          return (
            <BookmarkItem
              key={item.id}
              edit={<UpdateBookmark refetchQueries={refetchQueries} bookmark={item} />}
              remove={<DeleteBookmark refetchQueries={refetchQueries} bookmark={item} />}
              like={<LikeBookmark refetchQueries={refetchQueries} bookmark={item} />}
              bookmark={item}
            />
          )
        }}
      ></List>
    </Skeleton>
  )
}
