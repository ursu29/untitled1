import { PlusCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useRef, useState } from 'react'
// import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import { BookModal } from './BookModal'
import { LibraryFilters } from './LibraryFilters'
import { LibraryList } from './LibraryList'
import { Book, useLibraryApi } from './useLibraryApi'

export const LibraryPage = () => {
  const { data, dataLoading, dataUpdating, toggleStatus } = useLibraryApi()

  const [filtered, setFiltered] = useState(data?.books)
  const [isPopupVisible, setIsPopupVisible] = useState(true) // TODO: false by default
  const canEdit = true // TODO useStrapiGroupCheck('HR_RU')

  const editedBook = useRef<Book | null>(null)
  // TODO: implement (editing a book)
  // const openEditBookPopup = (book: Book) => {
  //   editedBook.current = book
  //   setIsPopupVisible(true)
  // }

  // const closeEditBookPopup = () => {
  //   editedBook.current = null
  //   setIsPopupVisible(false)
  // }

  return (
    <Skeleton active loading={dataLoading} withOffset>
      <PageContent noBottom>
        <Typography.Title>
          Library
          {canEdit && (
            <PlusCircleFilled
              style={{ color: '#1890FF', fontSize: 34, cursor: 'pointer', marginLeft: 20 }}
              onClick={() => setIsPopupVisible(true)}
            />
          )}
        </Typography.Title>
        <LibraryFilters books={data?.books} onFilterChange={setFiltered} />
      </PageContent>
      {data && (
        <LibraryList
          books={filtered}
          onStatusToggle={toggleStatus}
          isFetching={dataUpdating}
          isAdmin={true} // TODO don't forget to change this
        />
      )}
      <BookModal
        onClose={() => setIsPopupVisible(false)}
        visible={isPopupVisible} // TODO: don't forget to change this
        initialState={editedBook.current}
      />
    </Skeleton>
  )
}
