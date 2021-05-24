import message from '../../message'
import {
  GetBooksDocument,
  GetBooksQuery,
  useCreateBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
  useRemoveBookMutation,
  useTakeBookMutation,
} from '../../queries/books'
import { CreateBookInput, UpdateBookInput } from '../../types/graphql'
import { ArrayElement } from '../../utils/types'

export type Books = GetBooksQuery['books']
export type Book = ArrayElement<Books>

export const useLibraryApi = () => {
  const { data, loading: dataLoading } = useGetBooksQuery()
  const [updateBook, { loading: updatingInProgress }] = useUpdateBookMutation({
    onError: message.error,
  })
  const [removeBook] = useRemoveBookMutation({
    refetchQueries: [{ query: GetBooksDocument }],
    onError: message.error,
  })
  const [createBook, { loading: creatingInProgress }] = useCreateBookMutation({
    refetchQueries: [{ query: GetBooksDocument }],
    onError: message.error,
  })
  const [takeBook] = useTakeBookMutation({
    onError: message.error,
  })

  const dataUpdating = updatingInProgress || creatingInProgress

  const create = (input: CreateBookInput) => {
    console.log({ input })
    return createBook({ variables: { input } })
  }

  const update = (input: UpdateBookInput) => {
    return updateBook({ variables: { input } })
  }

  const remove = (id: string) => {
    return removeBook({ variables: { id } })
  }

  const take = (id: string) => {
    return takeBook({ variables: { id } })
  }

  const returnBook = (id: string) => {
    const input = {
      id,
      holder: null,
    }
    return update(input)
  }

  return {
    data,
    dataLoading,
    dataUpdating,
    create,
    update,
    remove,
    take,
    returnBook,
  }
}
