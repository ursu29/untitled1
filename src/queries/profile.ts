/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type GetProfileQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetProfileQuery = { __typename?: 'Query' } & Pick<Types.Query, 'isAuthenticated'> & {
    profile?: Types.Maybe<
      { __typename?: 'Employee' } & Pick<
        Types.Employee,
        | 'id'
        | 'name'
        | 'email'
        | 'location'
        | 'position'
        | 'status'
        | 'strapiId'
        | 'strapiGroupsMembership'
      >
    >
  }

export const GetProfileDocument = gql`
  query getProfile {
    profile {
      id
      name
      email
      location
      position
      status
      strapiId
      strapiGroupsMembership
    }
    isAuthenticated
  }
`

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions)
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    baseOptions,
  )
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>
