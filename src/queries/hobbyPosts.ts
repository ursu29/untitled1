/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type HobbyPostBaseFragment = { __typename?: 'HobbyPost' } & Pick<
  Types.HobbyPost,
  'id' | 'title' | 'body' | 'createdAt'
> & {
    createdBy?: Types.Maybe<
      { __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'name' | 'email'>
    >
    hobbies: Array<{ __typename?: 'Hobby' } & Pick<Types.Hobby, 'id' | 'name'>>
  }

export type GetHobbyPostsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetHobbyPostsQuery = { __typename?: 'Query' } & {
  hobbyPosts: Array<{ __typename?: 'HobbyPost' } & HobbyPostBaseFragment>
}

export type GetHobbyPostQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetHobbyPostQuery = { __typename?: 'Query' } & {
  hobbyPost?: Types.Maybe<{ __typename?: 'HobbyPost' } & HobbyPostBaseFragment>
}

export type CreateHobbyPostMutationVariables = Types.Exact<{
  input: Types.CreateHobbyPostInput
}>

export type CreateHobbyPostMutation = { __typename?: 'Mutation' } & {
  createHobbyPost?: Types.Maybe<{ __typename?: 'HobbyPost' } & HobbyPostBaseFragment>
}

export type UpdateHobbyPostMutationVariables = Types.Exact<{
  input: Types.UpdateHobbyPostInput
}>

export type UpdateHobbyPostMutation = { __typename?: 'Mutation' } & {
  updateHobbyPost?: Types.Maybe<{ __typename?: 'HobbyPost' } & HobbyPostBaseFragment>
}

export const HobbyPostBaseFragmentDoc = gql`
  fragment HobbyPostBase on HobbyPost {
    id
    title
    body
    createdAt
    createdBy {
      id
      name
      email
    }
    hobbies {
      id
      name
    }
  }
`
export const GetHobbyPostsDocument = gql`
  query getHobbyPosts {
    hobbyPosts {
      ...HobbyPostBase
    }
  }
  ${HobbyPostBaseFragmentDoc}
`

/**
 * __useGetHobbyPostsQuery__
 *
 * To run a query within a React component, call `useGetHobbyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHobbyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHobbyPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHobbyPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetHobbyPostsQuery, GetHobbyPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHobbyPostsQuery, GetHobbyPostsQueryVariables>(
    GetHobbyPostsDocument,
    options,
  )
}
export function useGetHobbyPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHobbyPostsQuery, GetHobbyPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHobbyPostsQuery, GetHobbyPostsQueryVariables>(
    GetHobbyPostsDocument,
    options,
  )
}
export type GetHobbyPostsQueryHookResult = ReturnType<typeof useGetHobbyPostsQuery>
export type GetHobbyPostsLazyQueryHookResult = ReturnType<typeof useGetHobbyPostsLazyQuery>
export type GetHobbyPostsQueryResult = Apollo.QueryResult<
  GetHobbyPostsQuery,
  GetHobbyPostsQueryVariables
>
export const GetHobbyPostDocument = gql`
  query getHobbyPost($id: ID!) {
    hobbyPost(id: $id) {
      ...HobbyPostBase
    }
  }
  ${HobbyPostBaseFragmentDoc}
`

/**
 * __useGetHobbyPostQuery__
 *
 * To run a query within a React component, call `useGetHobbyPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHobbyPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHobbyPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetHobbyPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetHobbyPostQuery, GetHobbyPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHobbyPostQuery, GetHobbyPostQueryVariables>(
    GetHobbyPostDocument,
    options,
  )
}
export function useGetHobbyPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHobbyPostQuery, GetHobbyPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHobbyPostQuery, GetHobbyPostQueryVariables>(
    GetHobbyPostDocument,
    options,
  )
}
export type GetHobbyPostQueryHookResult = ReturnType<typeof useGetHobbyPostQuery>
export type GetHobbyPostLazyQueryHookResult = ReturnType<typeof useGetHobbyPostLazyQuery>
export type GetHobbyPostQueryResult = Apollo.QueryResult<
  GetHobbyPostQuery,
  GetHobbyPostQueryVariables
>
export const CreateHobbyPostDocument = gql`
  mutation createHobbyPost($input: CreateHobbyPostInput!) {
    createHobbyPost(input: $input) {
      ...HobbyPostBase
    }
  }
  ${HobbyPostBaseFragmentDoc}
`
export type CreateHobbyPostMutationFn = Apollo.MutationFunction<
  CreateHobbyPostMutation,
  CreateHobbyPostMutationVariables
>

/**
 * __useCreateHobbyPostMutation__
 *
 * To run a mutation, you first call `useCreateHobbyPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHobbyPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHobbyPostMutation, { data, loading, error }] = useCreateHobbyPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHobbyPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateHobbyPostMutation,
    CreateHobbyPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateHobbyPostMutation, CreateHobbyPostMutationVariables>(
    CreateHobbyPostDocument,
    options,
  )
}
export type CreateHobbyPostMutationHookResult = ReturnType<typeof useCreateHobbyPostMutation>
export type CreateHobbyPostMutationResult = Apollo.MutationResult<CreateHobbyPostMutation>
export type CreateHobbyPostMutationOptions = Apollo.BaseMutationOptions<
  CreateHobbyPostMutation,
  CreateHobbyPostMutationVariables
>
export const UpdateHobbyPostDocument = gql`
  mutation updateHobbyPost($input: UpdateHobbyPostInput!) {
    updateHobbyPost(input: $input) {
      ...HobbyPostBase
    }
  }
  ${HobbyPostBaseFragmentDoc}
`
export type UpdateHobbyPostMutationFn = Apollo.MutationFunction<
  UpdateHobbyPostMutation,
  UpdateHobbyPostMutationVariables
>

/**
 * __useUpdateHobbyPostMutation__
 *
 * To run a mutation, you first call `useUpdateHobbyPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHobbyPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHobbyPostMutation, { data, loading, error }] = useUpdateHobbyPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHobbyPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateHobbyPostMutation,
    UpdateHobbyPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateHobbyPostMutation, UpdateHobbyPostMutationVariables>(
    UpdateHobbyPostDocument,
    options,
  )
}
export type UpdateHobbyPostMutationHookResult = ReturnType<typeof useUpdateHobbyPostMutation>
export type UpdateHobbyPostMutationResult = Apollo.MutationResult<UpdateHobbyPostMutation>
export type UpdateHobbyPostMutationOptions = Apollo.BaseMutationOptions<
  UpdateHobbyPostMutation,
  UpdateHobbyPostMutationVariables
>
