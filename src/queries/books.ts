/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type BookResponseFragment = { __typename?: 'Book' } & Pick<
  Types.Book,
  'id' | 'title' | 'author'
> & {
    tags: Array<{ __typename?: 'Skill' } & Pick<Types.Skill, 'id' | 'name'>>
    holder?: Types.Maybe<
      { __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'name' | 'email'>
    >
  }

export type GetBooksQueryVariables = Types.Exact<{
  skills?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetBooksQuery = { __typename?: 'Query' } & {
  books: Array<{ __typename?: 'Book' } & BookResponseFragment>
}

export type CreateBookMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.CreateBookInput>
}>

export type CreateBookMutation = { __typename?: 'Mutation' } & {
  createBook?: Types.Maybe<{ __typename?: 'Book' } & BookResponseFragment>
}

export type UpdateBookMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.UpdateBookInput>
}>

export type UpdateBookMutation = { __typename?: 'Mutation' } & {
  updateBook?: Types.Maybe<{ __typename?: 'Book' } & BookResponseFragment>
}

export type RemoveBookMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type RemoveBookMutation = { __typename?: 'Mutation' } & {
  removeBook?: Types.Maybe<{ __typename?: 'Book' } & BookResponseFragment>
}

export type TakeBookMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type TakeBookMutation = { __typename?: 'Mutation' } & {
  takeBook?: Types.Maybe<{ __typename?: 'Book' } & BookResponseFragment>
}

export const BookResponseFragmentDoc = gql`
  fragment BookResponse on Book {
    id
    title
    author
    tags {
      id
      name
    }
    holder {
      id
      name
      email
    }
  }
`
export const GetBooksDocument = gql`
  query getBooks($skills: [ID!]) {
    books(skills: $skills) {
      ...BookResponse
    }
  }
  ${BookResponseFragmentDoc}
`

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useGetBooksQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export function useGetBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>
export const CreateBookDocument = gql`
  mutation createBook($input: CreateBookInput) {
    createBook(input: $input) {
      ...BookResponse
    }
  }
  ${BookResponseFragmentDoc}
`
export type CreateBookMutationFn = Apollo.MutationFunction<
  CreateBookMutation,
  CreateBookMutationVariables
>

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(
    CreateBookDocument,
    options,
  )
}
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<
  CreateBookMutation,
  CreateBookMutationVariables
>
export const UpdateBookDocument = gql`
  mutation updateBook($input: UpdateBookInput) {
    updateBook(input: $input) {
      ...BookResponse
    }
  }
  ${BookResponseFragmentDoc}
`
export type UpdateBookMutationFn = Apollo.MutationFunction<
  UpdateBookMutation,
  UpdateBookMutationVariables
>

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    UpdateBookDocument,
    options,
  )
}
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookMutation,
  UpdateBookMutationVariables
>
export const RemoveBookDocument = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      ...BookResponse
    }
  }
  ${BookResponseFragmentDoc}
`
export type RemoveBookMutationFn = Apollo.MutationFunction<
  RemoveBookMutation,
  RemoveBookMutationVariables
>

/**
 * __useRemoveBookMutation__
 *
 * To run a mutation, you first call `useRemoveBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookMutation, { data, loading, error }] = useRemoveBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBookMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveBookMutation, RemoveBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveBookMutation, RemoveBookMutationVariables>(
    RemoveBookDocument,
    options,
  )
}
export type RemoveBookMutationHookResult = ReturnType<typeof useRemoveBookMutation>
export type RemoveBookMutationResult = Apollo.MutationResult<RemoveBookMutation>
export type RemoveBookMutationOptions = Apollo.BaseMutationOptions<
  RemoveBookMutation,
  RemoveBookMutationVariables
>
export const TakeBookDocument = gql`
  mutation takeBook($id: ID!) {
    takeBook(id: $id) {
      ...BookResponse
    }
  }
  ${BookResponseFragmentDoc}
`
export type TakeBookMutationFn = Apollo.MutationFunction<
  TakeBookMutation,
  TakeBookMutationVariables
>

/**
 * __useTakeBookMutation__
 *
 * To run a mutation, you first call `useTakeBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeBookMutation, { data, loading, error }] = useTakeBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTakeBookMutation(
  baseOptions?: Apollo.MutationHookOptions<TakeBookMutation, TakeBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TakeBookMutation, TakeBookMutationVariables>(TakeBookDocument, options)
}
export type TakeBookMutationHookResult = ReturnType<typeof useTakeBookMutation>
export type TakeBookMutationResult = Apollo.MutationResult<TakeBookMutation>
export type TakeBookMutationOptions = Apollo.BaseMutationOptions<
  TakeBookMutation,
  TakeBookMutationVariables
>
