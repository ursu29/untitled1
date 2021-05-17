import message from '../../message'
import {
  GetBooksDocument,
  GetBooksQuery,
  useCreateBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from '../../queries/books'
import { CreateBookInput, UpdateBookInput } from '../../types/graphql'
import { ArrayElement } from '../../utils/types'
import { useEmployee } from '../../utils/withEmployee'

export type Books = GetBooksQuery['books']
export type Book = ArrayElement<Books>

export const useLibraryApi = () => {
  const user = useEmployee()
  const { data, loading: dataLoading } = useGetBooksQuery()
  const [updateBook, { loading: updatingInProgress }] = useUpdateBookMutation({
    onError: message.error,
  })
  const [createBook, { loading: creatingInProgress }] = useCreateBookMutation({
    refetchQueries: [{ query: GetBooksDocument }],
    onError: message.error,
  })

  const dataUpdating = updatingInProgress || creatingInProgress

  const create = (input: CreateBookInput) => {
    return createBook({ variables: { input } })
  }

  const update = (input: UpdateBookInput) => {
    return updateBook({ variables: { input } })
  }

  const toggleStatus = (book: Book) => {
    const input = {
      id: book.id,
      holder: book.holder ? null : user.employee.id,
    }
    return update(input)
  }

  return {
    data,
    dataLoading,
    dataUpdating,
    create,
    update,
    toggleStatus,
  }
}
