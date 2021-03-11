/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type GetDevtoolsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetDevtoolsQuery = { __typename?: 'Query' } & {
  clientDevToolsGitInfo?: Types.Maybe<
    { __typename?: 'DevToolsGitInfo' } & Pick<
      Types.DevToolsGitInfo,
      'repoName' | 'branchName' | 'commitId' | 'commitMsg'
    >
  >
}

export type GetDevToolsAccessQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetDevToolsAccessQuery = { __typename?: 'Query' } & Pick<
  Types.Query,
  'clientDevToolsAccess'
>

export const GetDevtoolsDocument = gql`
  query getDevtools {
    clientDevToolsGitInfo {
      repoName
      branchName
      commitId
      commitMsg
    }
  }
`

/**
 * __useGetDevtoolsQuery__
 *
 * To run a query within a React component, call `useGetDevtoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevtoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevtoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDevtoolsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetDevtoolsQuery, GetDevtoolsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetDevtoolsQuery, GetDevtoolsQueryVariables>(
    GetDevtoolsDocument,
    baseOptions,
  )
}
export function useGetDevtoolsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDevtoolsQuery, GetDevtoolsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetDevtoolsQuery, GetDevtoolsQueryVariables>(
    GetDevtoolsDocument,
    baseOptions,
  )
}
export type GetDevtoolsQueryHookResult = ReturnType<typeof useGetDevtoolsQuery>
export type GetDevtoolsLazyQueryHookResult = ReturnType<typeof useGetDevtoolsLazyQuery>
export type GetDevtoolsQueryResult = ApolloReactCommon.QueryResult<
  GetDevtoolsQuery,
  GetDevtoolsQueryVariables
>
export const GetDevToolsAccessDocument = gql`
  query getDevToolsAccess {
    clientDevToolsAccess
  }
`

/**
 * __useGetDevToolsAccessQuery__
 *
 * To run a query within a React component, call `useGetDevToolsAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevToolsAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevToolsAccessQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDevToolsAccessQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDevToolsAccessQuery,
    GetDevToolsAccessQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetDevToolsAccessQuery, GetDevToolsAccessQueryVariables>(
    GetDevToolsAccessDocument,
    baseOptions,
  )
}
export function useGetDevToolsAccessLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDevToolsAccessQuery,
    GetDevToolsAccessQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetDevToolsAccessQuery, GetDevToolsAccessQueryVariables>(
    GetDevToolsAccessDocument,
    baseOptions,
  )
}
export type GetDevToolsAccessQueryHookResult = ReturnType<typeof useGetDevToolsAccessQuery>
export type GetDevToolsAccessLazyQueryHookResult = ReturnType<typeof useGetDevToolsAccessLazyQuery>
export type GetDevToolsAccessQueryResult = ApolloReactCommon.QueryResult<
  GetDevToolsAccessQuery,
  GetDevToolsAccessQueryVariables
>
