import { Input, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import React, { useEffect, useState } from 'react'
import { GetBooksQuery } from '../../queries/books'
import { ArrayElement } from '../../utils/types'
import './styles.css'

type Props = {
  books?: GetBooksQuery['books']
  onFilterChange: (filteredBooks: Props['books']) => void
}

type Book = ArrayElement<Props['books']>

export const LibraryFilters = ({ books, onFilterChange }: Props) => {
  const [searchFilter, setSearchFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const filterBySearch = (book: Book) => {
      if (!searchFilter) return true
      return `${book.title} ${book.author}`.toLowerCase().includes(searchFilter.toLowerCase())
    }

    const filterByStatus = (book: Book) => {
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

    const filterBooks = (book: Book) => {
      return filterBySearch(book) && filterByStatus(book)
    }
    books && onFilterChange(books.filter(filterBooks))
  }, [searchFilter, statusFilter, books, onFilterChange])

  return (
    <div className="library-filters">
      <Input
        className="search-input"
        placeholder="Search"
        value={searchFilter}
        onChange={(e: any) => setSearchFilter(e.target.value)}
        data-cy="search"
      />
      <div className="radio-container">
        <span className="show">Show:</span>
        <Radio.Group
          defaultValue="all"
          onChange={(e: RadioChangeEvent) => setStatusFilter(e.target.value)}
        >
          <Radio value="all">All</Radio>
          <Radio value="taken">Taken</Radio>
          <Radio value="free">Free</Radio>
        </Radio.Group>
      </div>
    </div>
  )
}
