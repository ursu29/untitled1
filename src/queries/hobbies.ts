/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type HobbyFragmentFragment = { __typename?: 'Hobby' } & Pick<
  Types.Hobby,
  'id' | 'name' | 'description'
>

export type GetHobbiesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetHobbiesQuery = { __typename?: 'Query' } & {
  hobbies: Array<{ __typename?: 'Hobby' } & HobbyFragmentFragment>
}

export type CreateHobbyMutationVariables = Types.Exact<{
  input: Types.CreateHobbyInput
}>

export type CreateHobbyMutation = { __typename?: 'Mutation' } & {
  createHobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyFragmentFragment>
}

export type UpdateHobbyMutationVariables = Types.Exact<{
  input: Types.UpdateHobbyInput
}>

export type UpdateHobbyMutation = { __typename?: 'Mutation' } & {
  updateHobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyFragmentFragment>
}

export const HobbyFragmentFragmentDoc = gql`
  fragment HobbyFragment on Hobby {
    id
    name
    description
  }
`
export const GetHobbiesDocument = gql`
  query getHobbies {
    hobbies {
      ...HobbyFragment
    }
  }
  ${HobbyFragmentFragmentDoc}
`

/**
 * __useGetHobbiesQuery__
 *
 * To run a query within a React component, call `useGetHobbiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHobbiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHobbiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHobbiesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetHobbiesQuery, GetHobbiesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetHobbiesQuery, GetHobbiesQueryVariables>(
    GetHobbiesDocument,
    baseOptions,
  )
}
export function useGetHobbiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHobbiesQuery, GetHobbiesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetHobbiesQuery, GetHobbiesQueryVariables>(
    GetHobbiesDocument,
    baseOptions,
  )
}
export type GetHobbiesQueryHookResult = ReturnType<typeof useGetHobbiesQuery>
export type GetHobbiesLazyQueryHookResult = ReturnType<typeof useGetHobbiesLazyQuery>
export type GetHobbiesQueryResult = ApolloReactCommon.QueryResult<
  GetHobbiesQuery,
  GetHobbiesQueryVariables
>
export const CreateHobbyDocument = gql`
  mutation createHobby($input: CreateHobbyInput!) {
    createHobby(input: $input) {
      ...HobbyFragment
    }
  }
  ${HobbyFragmentFragmentDoc}
`
export type CreateHobbyMutationFn = ApolloReactCommon.MutationFunction<
  CreateHobbyMutation,
  CreateHobbyMutationVariables
>

/**
 * __useCreateHobbyMutation__
 *
 * To run a mutation, you first call `useCreateHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHobbyMutation, { data, loading, error }] = useCreateHobbyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHobbyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateHobbyMutation,
    CreateHobbyMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateHobbyMutation, CreateHobbyMutationVariables>(
    CreateHobbyDocument,
    baseOptions,
  )
}
export type CreateHobbyMutationHookResult = ReturnType<typeof useCreateHobbyMutation>
export type CreateHobbyMutationResult = ApolloReactCommon.MutationResult<CreateHobbyMutation>
export type CreateHobbyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateHobbyMutation,
  CreateHobbyMutationVariables
>
export const UpdateHobbyDocument = gql`
  mutation updateHobby($input: UpdateHobbyInput!) {
    updateHobby(input: $input) {
      ...HobbyFragment
    }
  }
  ${HobbyFragmentFragmentDoc}
`
export type UpdateHobbyMutationFn = ApolloReactCommon.MutationFunction<
  UpdateHobbyMutation,
  UpdateHobbyMutationVariables
>

/**
 * __useUpdateHobbyMutation__
 *
 * To run a mutation, you first call `useUpdateHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHobbyMutation, { data, loading, error }] = useUpdateHobbyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHobbyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateHobbyMutation,
    UpdateHobbyMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateHobbyMutation, UpdateHobbyMutationVariables>(
    UpdateHobbyDocument,
    baseOptions,
  )
}
export type UpdateHobbyMutationHookResult = ReturnType<typeof useUpdateHobbyMutation>
export type UpdateHobbyMutationResult = ApolloReactCommon.MutationResult<UpdateHobbyMutation>
export type UpdateHobbyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateHobbyMutation,
  UpdateHobbyMutationVariables
>
