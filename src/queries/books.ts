/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type GetBooksQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetBooksQuery = { __typename?: 'Query' } & {
  books: Array<
    { __typename?: 'Book' } & Pick<Types.Book, 'id' | 'title' | 'author'> & {
        tags: Array<{ __typename?: 'Skill' } & Pick<Types.Skill, 'id' | 'name'>>
        holder?: Types.Maybe<{ __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'name'>>
      }
  >
}

export const GetBooksDocument = gql`
  query getBooks {
    books {
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
      }
    }
  }
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
 *   },
 * });
 */
export function useGetBooksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetBooksQuery, GetBooksQueryVariables>(
    GetBooksDocument,
    baseOptions,
  )
}
export function useGetBooksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(
    GetBooksDocument,
    baseOptions,
  )
}
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>
export type GetBooksQueryResult = ApolloReactCommon.QueryResult<
  GetBooksQuery,
  GetBooksQueryVariables
>
