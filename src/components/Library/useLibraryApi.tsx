import message from '../../message'
import { GetBooksQuery, useGetBooksQuery, useUpdateBookMutation } from '../../queries/books'
import { UpdateBookInput } from '../../types/graphql'
import { ArrayElement } from '../../utils/types'
import { useEmployee } from '../../utils/withEmployee'

export type Books = GetBooksQuery['books']
export type Book = ArrayElement<Books>

export const useLibraryApi = () => {
  const user = useEmployee()
  const { data, loading: dataLoading } = useGetBooksQuery()
  const [updateBook, { loading: dataUpdating }] = useUpdateBookMutation({
    onError: message.error,
  })

  const toggleStatus = (book: Book): void => {
    const input = {
      id: book.id,
      holder: book.holder ? null : user.employee.id,
    }
    update(input)
  }

  const update = (input: UpdateBookInput): void => {
    updateBook({ variables: { input } })
  }

  return {
    data,
    dataLoading,
    dataUpdating,
    update,
    toggleStatus,
  }
}
