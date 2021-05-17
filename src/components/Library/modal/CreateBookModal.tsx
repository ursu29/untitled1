import React from 'react'
import message from '../../../message'
import { useLibraryApi } from '../useLibraryApi'
import { BookModal, BookModalProps, SubmitBook } from './BookModal'

interface CreateBookModalProps extends BookModalProps {}

export const AddBookModal: React.FC<CreateBookModalProps> = props => {
  const { create } = useLibraryApi()

  const handleSubmit = (book: SubmitBook) => {
    const input = {
      title: book.title,
      author: book.author,
      tags: book.tags?.map(tag => tag.id),
    }
    create(input).then(() => {
      props.onClose()
      message.success('Book was updated')
    })
  }

  return <BookModal {...props} onSubmit={handleSubmit} />
}
