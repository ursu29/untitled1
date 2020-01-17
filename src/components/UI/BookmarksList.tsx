import React, { useState } from 'react'
import BookmarkItem from './Bookmark'
import { Employee, Access, Bookmark } from '../../types'
import { List, Input, Skeleton } from 'antd'
import FuzzySearch from 'fuzzy-search'

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link'> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  access: Pick<Access, 'write'>
}

interface Props {
  loading: boolean
  bookmarks?: BookmarkPick[]
  UpdateBookmark: React.FC<{ bookmark: BookmarkPick }>
  DeleteBookmark: React.FC<{ bookmark: BookmarkPick }>
  LikeBookmark: React.FC<{ bookmark: any }>
  createBookmark: any
}

export default function BookmarksList({
  loading,
  bookmarks,
  createBookmark,
  UpdateBookmark,
  DeleteBookmark,
  LikeBookmark,
}: Props) {
  const [filter, setFilter] = useState('')

  if (!loading && !bookmarks) {
    return <div>No bookmarks found</div>
  }

  const searcher = new FuzzySearch(bookmarks || [], ['title'])
  const filteredItems: BookmarkPick[] = searcher.search(filter.trim())

  if (!loading && !filter && !filteredItems.length) {
    return <div>No bookmarks yet</div>
  }

  return (
    <Skeleton loading={loading} active>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={(e: any) => setFilter(e.target.value)}
          value={filter}
        />
        {createBookmark && <div style={{ marginLeft: 8 }}>{createBookmark}</div>}
      </div>
      <List
        pagination={{
          pageSize: 25,
          hideOnSinglePage: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        dataSource={filteredItems}
        renderItem={item => {
          return (
            <BookmarkItem
              key={item.id}
              edit={<UpdateBookmark bookmark={item} />}
              remove={<DeleteBookmark bookmark={item} />}
              like={<LikeBookmark bookmark={item} />}
              bookmark={item}
            />
          )
        }}
      ></List>
    </Skeleton>
  )
}
