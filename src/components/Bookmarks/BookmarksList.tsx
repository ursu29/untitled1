import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import query, { QueryType } from '../../queries/getBookmarks';
import BookmarkItem from '../UI/Bookmark'
import { Employee, Access, Bookmark } from '../../types'
import { List, Input } from 'antd';
import FuzzySearch from 'fuzzy-search';

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link'> & {
  employee: Pick<Employee, "id" | "name" | "email">,
  access: Pick<Access, "write">
}

function BookmarksList() {
  const { data } = useQuery<QueryType>(query)
  const [filter, setFilter] = useState('')

  if (!data?.bookmarks) {
    return (
      <div>No bookmarks found</div>
    )
  }

  const searcher = new FuzzySearch(data.bookmarks, ['title'])
  const filteredItems: BookmarkPick[] = searcher.search(filter.trim())

  return (
      <div>
        <Input style={{ marginBottom: 8 }} placeholder="Search" onChange={(e: any) => setFilter(e.target.value)} value={filter} />
        <List
          pagination={{
            pageSize: 25,
            hideOnSinglePage: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          dataSource={filteredItems}
          renderItem={item => (
            <BookmarkItem key={item.id} bookmark={item}/>
          )}
        ></List>
      </div>
  )
}

export default withRouter(BookmarksList)