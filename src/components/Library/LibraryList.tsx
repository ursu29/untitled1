import React from 'react'
import { Badge, Table, Tag } from 'antd'
import Button from '../UI/Button'
import { Book, Books } from './useLibraryApi'

type Props = {
  books?: Books
  onStatusToggle: (book: Book) => void
  isAdmin?: boolean
  isFetching?: boolean
}

const isBooked = (book: Book) => !!book.holder?.id

export const LibraryList: React.FC<Props> = ({ books, onStatusToggle, isFetching, isAdmin }) => {
  const columns = [
    {
      title: 'Name',
      key: 'title',
      width: '35%',
      render: (book: Book) => <div>{book.title}</div>,
    },
    {
      title: 'Author',
      key: 'author',
      width: '15%',
      render: (book: Book) => <div>{book.author}</div>,
    },
    {
      title: 'Status',
      key: 'status',
      width: '10%',
      render: (book: Book) =>
        book.holder?.id ? (
          <Badge status="warning" text="Taken" />
        ) : (
          <Badge status="success" text="Free" />
        ),
    },
    {
      title: 'Taken By',
      key: 'takenBy',
      width: '15%',
      render: (book: Book) => <div>{book.holder?.name || '–'}</div>,
    },
    {
      title: 'Tags',
      key: 'tags',
      width: '15%',
      render: (book: Book) => {
        const { tags } = book
        return tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)
      },
    },
    {
      title: '',
      key: 'buttons',
      width: '10%',
      render: (book: Book) => {
        const booked = isBooked(book)
        if (!isAdmin && booked) return null
        return (
          <Button size="small" onClick={() => onStatusToggle(book)} disabled={isFetching}>
            {booked ? 'Return' : 'Take'}
          </Button>
        )
      },
    },
  ]

  return (
    <Table
      data-cy="library_table"
      tableLayout="fixed"
      dataSource={books}
      pagination={false}
      columns={columns}
      rowKey="id"
      size="middle"
    />
  )
}
