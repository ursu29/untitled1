import { Button, Tabs } from 'antd'
import React, { useState, useEffect } from 'react'
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
  const canEdit = useStrapiGroupCheck('LIBRARIAN')

  const [searchFilter, setSearchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const books = data?.books.slice().sort((a, b) => (a.holder?.id ? 1 : -1)) || []

  useEffect(() => {
    setFiltered(books)
    //eslint-disable-next-line
  }, [dataLoading])

  useEffect(() => {
    const filterBySearch = (book: typeof books[0]) => {
      if (!searchFilter) return true
      return `${book.title} ${book.author}`.toLowerCase().includes(searchFilter.toLowerCase())
    }

    const filterByStatus = (book: typeof books[0]) => {
      const taken = !!book.holder?.id
      switch (statusFilter) {
        case 'taken':
          return taken
        case 'free':
          return !taken
        default:
          return true
      }
    }

    const filterBooks = (book: typeof books[0]) => {
      return filterBySearch(book) && filterByStatus(book)
    }

    books && setFiltered(books.filter(filterBooks))
    //eslint-disable-next-line
  }, [searchFilter, statusFilter])

  return (
    <>
      <PageHeader
        title="Library"
        extra={[
          canEdit ? (
            <Button type="primary" onClick={() => setIsPopupVisible(true)} data-cy="addBook">
              Add Book
            </Button>
          ) : null,
        ]}
        withoutDivider
      />
      <PageContent
        loading={dataLoading}
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: '-32px' }}
      >
        <Tabs
          onTabClick={key => {
            setStatusFilter(key)
          }}
          tabBarStyle={{ paddingLeft: '24px' }}
        >
          <Tabs.TabPane tab="All" key="all" />
          <Tabs.TabPane tab="Free" key="free" />
          <Tabs.TabPane tab="Taken" key="taken" />
        </Tabs>
        <LibraryFilters onSearch={setSearchFilter} searchFilter={searchFilter} />
        {data && <LibraryList books={filtered} isFetching={dataUpdating} isAdmin={canEdit} />}
        <AddBookModal onClose={() => setIsPopupVisible(false)} visible={isPopupVisible} />
      </PageContent>
    </>
  )
}
