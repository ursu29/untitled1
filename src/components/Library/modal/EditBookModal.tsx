import React from 'react'
import message from '../../../message'
import { useLibraryApi } from '../useLibraryApi'
import { BookModal, BookModalProps, SubmitBook } from './BookModal'

interface EditBookModalProps extends BookModalProps {}

export const EditBookModal: React.FC<EditBookModalProps> = props => {
  const { update } = useLibraryApi()

  const handleSubmit = (book: SubmitBook) => {
    const input = {
      id: props.initialState?.id || '',
      title: book.title,
      author: book.author,
      tags: book.tags?.map(tag => tag.id),
    }
    update(input).then(() => {
      props.onClose()
      message.success('Book was updated')
    })
  }

  return <BookModal {...props} onSubmit={handleSubmit} />
}
