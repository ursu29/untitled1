import React, { useEffect, useState } from 'react'
import { Badge, Table, Tag } from 'antd'
import Button from '../UI/Button'
import { Book, Books, useLibraryApi } from './useLibraryApi'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { EditBookModal } from './modal/EditBookModal'

type Props = {
  books?: Books
  isAdmin?: boolean
  isFetching?: boolean
}

const isBooked = (book: Book) => !!book.holder?.id

export const LibraryList: React.FC<Props> = ({ books, isFetching, isAdmin }) => {
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null)
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false)
  const { toggleStatus } = useLibraryApi()

  useEffect(() => {
    setIsEditPopupVisible(!!bookToEdit)
  }, [bookToEdit])

  // TODO: implement
  const handleDelete = (book: Book) => {
    console.log('handle delete')
    console.log(book)
  }

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

        const StatusSection = (book: Book) => {
          if (!isAdmin && booked) return null
          return (
            <Button size="small" onClick={() => toggleStatus(book)} disabled={isFetching}>
              {booked ? 'Return' : 'Take'}
            </Button>
          )
        }

        const EditSection = (book: Book) => (
          <div style={{ display: 'flex' }}>
            <EditOutlined
              style={{ fontSize: 14, cursor: 'pointer' }}
              onClick={() => setBookToEdit(book)}
            />
            <DeleteOutlined
              style={{ fontSize: 14, cursor: 'pointer', marginLeft: 10 }}
              onClick={() => handleDelete(book)}
            />
          </div>
        )

        return isAdmin ? EditSection(book) : StatusSection(book)
      },
    },
  ]

  return (
    <>
      <Table
        data-cy="library_table"
        tableLayout="fixed"
        dataSource={books}
        pagination={false}
        columns={columns}
        rowKey="id"
        size="middle"
      />
      <EditBookModal
        onClose={() => setBookToEdit(null)}
        visible={isEditPopupVisible}
        initialState={bookToEdit}
      ></EditBookModal>
    </>
  )
}
