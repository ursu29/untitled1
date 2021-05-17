import { Button } from 'antd'
import React, { useState } from 'react'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageContent from '../UI/PageContent'
import PageHeader from '../UI/PageHeader'
import { AddBookModal } from './modal/CreateBookModal'
import { LibraryFilters } from './LibraryFilters'
import { LibraryList } from './LibraryList'
import { useLibraryApi } from './useLibraryApi'

export const LibraryPage = () => {
  const { data, dataLoading, dataUpdating } = useLibraryApi()
  const [filtered, setFiltered] = useState(data?.books)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const canEdit = useStrapiGroupCheck('HR_RU')

  return (
    <>
      <PageHeader
        title="Library"
        extra={[canEdit ? <Button onClick={() => setIsPopupVisible(true)}>Add Book</Button> : null]}
      />
      <PageContent loading={dataLoading} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <LibraryFilters books={data?.books} onFilterChange={setFiltered} />
        {data && <LibraryList books={filtered} isFetching={dataUpdating} isAdmin={canEdit} />}
        <AddBookModal onClose={() => setIsPopupVisible(false)} visible={isPopupVisible} />
      </PageContent>
    </>
  )
}
