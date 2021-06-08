/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetDevrelsQueryVariables = Types.Exact<{
  type: Types.Scalars['String']
}>

export type GetDevrelsQuery = { __typename?: 'Query' } & {
  devrels: Array<
    { __typename?: 'Devrel' } & Pick<
      Types.Devrel,
      | 'id'
      | 'type'
      | 'title'
      | 'link'
      | 'resource'
      | 'dateStart'
      | 'dateEnd'
      | 'isCompleted'
      | 'isDraft'
    > & {
        employee?: Types.Maybe<
          { __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'email' | 'name'>
        >
      }
  >
}

export type CreateDevrelMutationVariables = Types.Exact<{
  input: Types.CreateDevrelInput
}>

export type CreateDevrelMutation = { __typename?: 'Mutation' } & {
  createDevrel?: Types.Maybe<{ __typename?: 'Devrel' } & Pick<Types.Devrel, 'id'>>
}

export type UpdateDevrelMutationVariables = Types.Exact<{
  input: Types.UpdateDevrelInput
}>

export type UpdateDevrelMutation = { __typename?: 'Mutation' } & {
  updateDevrel?: Types.Maybe<{ __typename?: 'Devrel' } & Pick<Types.Devrel, 'id'>>
}

export type DeleteDevrelMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteDevrelMutation = { __typename?: 'Mutation' } & {
  deleteDevrel?: Types.Maybe<{ __typename?: 'Devrel' } & Pick<Types.Devrel, 'id'>>
}

export type AcceptDevrelMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type AcceptDevrelMutation = { __typename?: 'Mutation' } & {
  acceptDevrel?: Types.Maybe<{ __typename?: 'Devrel' } & Pick<Types.Devrel, 'id'>>
}

export type ProposeDevrelEventMutationVariables = Types.Exact<{
  input: Types.ProposeDevrelEventInput
}>

export type ProposeDevrelEventMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'proposeDevrelEvent'
>

export type ParticipateDevrelEventMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type ParticipateDevrelEventMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'participateDevrelEvent'
>

export const GetDevrelsDocument = gql`
  query getDevrels($type: String!) {
    devrels(type: $type) {
      id
      type
      title
      link
      resource
      dateStart
      dateEnd
      employee {
        id
        email
        name
      }
      isCompleted
      isDraft
    }
  }
`

/**
 * __useGetDevrelsQuery__
 *
 * To run a query within a React component, call `useGetDevrelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevrelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevrelsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetDevrelsQuery(
  baseOptions: Apollo.QueryHookOptions<GetDevrelsQuery, GetDevrelsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDevrelsQuery, GetDevrelsQueryVariables>(GetDevrelsDocument, options)
}
export function useGetDevrelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDevrelsQuery, GetDevrelsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDevrelsQuery, GetDevrelsQueryVariables>(GetDevrelsDocument, options)
}
export type GetDevrelsQueryHookResult = ReturnType<typeof useGetDevrelsQuery>
export type GetDevrelsLazyQueryHookResult = ReturnType<typeof useGetDevrelsLazyQuery>
export type GetDevrelsQueryResult = Apollo.QueryResult<GetDevrelsQuery, GetDevrelsQueryVariables>
export const CreateDevrelDocument = gql`
  mutation createDevrel($input: CreateDevrelInput!) {
    createDevrel(input: $input) {
      id
    }
  }
`
export type CreateDevrelMutationFn = Apollo.MutationFunction<
  CreateDevrelMutation,
  CreateDevrelMutationVariables
>

/**
 * __useCreateDevrelMutation__
 *
 * To run a mutation, you first call `useCreateDevrelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDevrelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDevrelMutation, { data, loading, error }] = useCreateDevrelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDevrelMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateDevrelMutation, CreateDevrelMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateDevrelMutation, CreateDevrelMutationVariables>(
    CreateDevrelDocument,
    options,
  )
}
export type CreateDevrelMutationHookResult = ReturnType<typeof useCreateDevrelMutation>
export type CreateDevrelMutationResult = Apollo.MutationResult<CreateDevrelMutation>
export type CreateDevrelMutationOptions = Apollo.BaseMutationOptions<
  CreateDevrelMutation,
  CreateDevrelMutationVariables
>
export const UpdateDevrelDocument = gql`
  mutation updateDevrel($input: UpdateDevrelInput!) {
    updateDevrel(input: $input) {
      id
    }
  }
`
export type UpdateDevrelMutationFn = Apollo.MutationFunction<
  UpdateDevrelMutation,
  UpdateDevrelMutationVariables
>

/**
 * __useUpdateDevrelMutation__
 *
 * To run a mutation, you first call `useUpdateDevrelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDevrelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDevrelMutation, { data, loading, error }] = useUpdateDevrelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDevrelMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateDevrelMutation, UpdateDevrelMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateDevrelMutation, UpdateDevrelMutationVariables>(
    UpdateDevrelDocument,
    options,
  )
}
export type UpdateDevrelMutationHookResult = ReturnType<typeof useUpdateDevrelMutation>
export type UpdateDevrelMutationResult = Apollo.MutationResult<UpdateDevrelMutation>
export type UpdateDevrelMutationOptions = Apollo.BaseMutationOptions<
  UpdateDevrelMutation,
  UpdateDevrelMutationVariables
>
export const DeleteDevrelDocument = gql`
  mutation deleteDevrel($id: ID!) {
    deleteDevrel(id: $id) {
      id
    }
  }
`
export type DeleteDevrelMutationFn = Apollo.MutationFunction<
  DeleteDevrelMutation,
  DeleteDevrelMutationVariables
>

/**
 * __useDeleteDevrelMutation__
 *
 * To run a mutation, you first call `useDeleteDevrelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDevrelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDevrelMutation, { data, loading, error }] = useDeleteDevrelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDevrelMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteDevrelMutation, DeleteDevrelMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteDevrelMutation, DeleteDevrelMutationVariables>(
    DeleteDevrelDocument,
    options,
  )
}
export type DeleteDevrelMutationHookResult = ReturnType<typeof useDeleteDevrelMutation>
export type DeleteDevrelMutationResult = Apollo.MutationResult<DeleteDevrelMutation>
export type DeleteDevrelMutationOptions = Apollo.BaseMutationOptions<
  DeleteDevrelMutation,
  DeleteDevrelMutationVariables
>
export const AcceptDevrelDocument = gql`
  mutation acceptDevrel($id: ID!) {
    acceptDevrel(id: $id) {
      id
    }
  }
`
export type AcceptDevrelMutationFn = Apollo.MutationFunction<
  AcceptDevrelMutation,
  AcceptDevrelMutationVariables
>

/**
 * __useAcceptDevrelMutation__
 *
 * To run a mutation, you first call `useAcceptDevrelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptDevrelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptDevrelMutation, { data, loading, error }] = useAcceptDevrelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptDevrelMutation(
  baseOptions?: Apollo.MutationHookOptions<AcceptDevrelMutation, AcceptDevrelMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AcceptDevrelMutation, AcceptDevrelMutationVariables>(
    AcceptDevrelDocument,
    options,
  )
}
export type AcceptDevrelMutationHookResult = ReturnType<typeof useAcceptDevrelMutation>
export type AcceptDevrelMutationResult = Apollo.MutationResult<AcceptDevrelMutation>
export type AcceptDevrelMutationOptions = Apollo.BaseMutationOptions<
  AcceptDevrelMutation,
  AcceptDevrelMutationVariables
>
export const ProposeDevrelEventDocument = gql`
  mutation proposeDevrelEvent($input: ProposeDevrelEventInput!) {
    proposeDevrelEvent(input: $input)
  }
`
export type ProposeDevrelEventMutationFn = Apollo.MutationFunction<
  ProposeDevrelEventMutation,
  ProposeDevrelEventMutationVariables
>

/**
 * __useProposeDevrelEventMutation__
 *
 * To run a mutation, you first call `useProposeDevrelEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProposeDevrelEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proposeDevrelEventMutation, { data, loading, error }] = useProposeDevrelEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProposeDevrelEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProposeDevrelEventMutation,
    ProposeDevrelEventMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProposeDevrelEventMutation, ProposeDevrelEventMutationVariables>(
    ProposeDevrelEventDocument,
    options,
  )
}
export type ProposeDevrelEventMutationHookResult = ReturnType<typeof useProposeDevrelEventMutation>
export type ProposeDevrelEventMutationResult = Apollo.MutationResult<ProposeDevrelEventMutation>
export type ProposeDevrelEventMutationOptions = Apollo.BaseMutationOptions<
  ProposeDevrelEventMutation,
  ProposeDevrelEventMutationVariables
>
export const ParticipateDevrelEventDocument = gql`
  mutation participateDevrelEvent($id: ID!) {
    participateDevrelEvent(id: $id)
  }
`
export type ParticipateDevrelEventMutationFn = Apollo.MutationFunction<
  ParticipateDevrelEventMutation,
  ParticipateDevrelEventMutationVariables
>

/**
 * __useParticipateDevrelEventMutation__
 *
 * To run a mutation, you first call `useParticipateDevrelEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useParticipateDevrelEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [participateDevrelEventMutation, { data, loading, error }] = useParticipateDevrelEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useParticipateDevrelEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ParticipateDevrelEventMutation,
    ParticipateDevrelEventMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ParticipateDevrelEventMutation,
    ParticipateDevrelEventMutationVariables
  >(ParticipateDevrelEventDocument, options)
}
export type ParticipateDevrelEventMutationHookResult = ReturnType<
  typeof useParticipateDevrelEventMutation
>
export type ParticipateDevrelEventMutationResult =
  Apollo.MutationResult<ParticipateDevrelEventMutation>
export type ParticipateDevrelEventMutationOptions = Apollo.BaseMutationOptions<
  ParticipateDevrelEventMutation,
  ParticipateDevrelEventMutationVariables
>
