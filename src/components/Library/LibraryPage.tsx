import { Typography } from 'antd'
import React, { useState } from 'react'
import { useGetBooksQuery } from '../../queries/books'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import { LibraryFilters } from './LibraryFilters'
import { LibraryList } from './LibraryList'

export const LibraryPage = () => {
  const { data, loading } = useGetBooksQuery()
  const [filtered, setFiltered] = useState(data?.books)

  return (
    <Skeleton active loading={loading} withOffset>
      <PageContent noBottom>
        <Typography.Title>Library</Typography.Title>
        <LibraryFilters books={data?.books} onFilterChange={setFiltered} />
      </PageContent>
      {data && <LibraryList books={filtered} />}
    </Skeleton>
  )
}
