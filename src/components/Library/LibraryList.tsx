import React from 'react'
import { Badge, Table, Tag } from 'antd'
import Button from '../UI/Button'
import { GetBooksQuery } from '../../queries/books'
import { Book, Skill } from '../../types/api'

type Props = {
  books?: GetBooksQuery['books']
}

const isBooked = (book: Book) => !!book.holder?.id

export const LibraryList = (props: Props) => {
  const { books } = props

  const columns = [
    {
      title: 'Name',
      key: 'title',
      render: (book: Book) => <div>{book.title}</div>,
    },
    {
      title: 'Author',
      key: 'author',
      render: (book: Book) => <div>{book.author}</div>,
    },
    {
      title: 'Status',
      key: 'status',
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
      render: (book: Book) => <div>{book.holder?.name || '–'}</div>,
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (book: Book) => {
        const { tags } = book
        return tags.map((tag: Skill) => <Tag key={tag.id}>{tag.name}</Tag>)
      },
    },
    {
      title: '',
      key: 'buttons',
      render: (book: Book) => {
        const booked = isBooked(book)
        const handleClick = () => console.log(`${booked ? 'Return' : 'Take'}`)
        return (
          <Button size="small" onClick={handleClick}>
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
