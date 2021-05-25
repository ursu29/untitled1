/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type HobbyBaseFragment = { __typename?: 'Hobby' } & Pick<
  Types.Hobby,
  'id' | 'name' | 'description'
>

export type EmployeeInfoFragment = { __typename?: 'Employee' } & Pick<
  Types.Employee,
  | 'id'
  | 'name'
  | 'email'
  | 'location'
  | 'country'
  | 'position'
  | 'phoneNumber'
  | 'startDate'
  | 'birthday'
>

export type HobbyFullFragment = { __typename?: 'Hobby' } & Pick<Types.Hobby, 'isMember'> & {
    members: Array<{ __typename?: 'Employee' } & EmployeeInfoFragment>
  } & HobbyBaseFragment

export type GetHobbiesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetHobbiesQuery = { __typename?: 'Query' } & {
  hobbies: Array<{ __typename?: 'Hobby' } & HobbyBaseFragment>
}

export type GetHobbyQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetHobbyQuery = { __typename?: 'Query' } & {
  hobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyFullFragment>
}

export type GetEmployeeHobbiesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetEmployeeHobbiesQuery = { __typename?: 'Query' } & {
  employee?: Types.Maybe<
    { __typename?: 'Employee' } & Pick<Types.Employee, 'id'> & {
        hobbies: Array<{ __typename?: 'Hobby' } & HobbyBaseFragment>
      }
  >
}

export type CreateHobbyMutationVariables = Types.Exact<{
  input: Types.CreateHobbyInput
}>

export type CreateHobbyMutation = { __typename?: 'Mutation' } & {
  createHobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyBaseFragment>
}

export type UpdateHobbyMutationVariables = Types.Exact<{
  input: Types.UpdateHobbyInput
}>

export type UpdateHobbyMutation = { __typename?: 'Mutation' } & {
  updateHobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyBaseFragment>
}

export type JoinHobbyMutationVariables = Types.Exact<{
  input: Types.JoinHobbyInput
}>

export type JoinHobbyMutation = { __typename?: 'Mutation' } & {
  joinHobby?: Types.Maybe<{ __typename?: 'Hobby' } & HobbyFullFragment>
}

export const HobbyBaseFragmentDoc = gql`
  fragment HobbyBase on Hobby {
    id
    name
    description
  }
`
export const EmployeeInfoFragmentDoc = gql`
  fragment EmployeeInfo on Employee {
    id
    name
    email
    location
    country
    position
    phoneNumber
    startDate
    birthday
  }
`
export const HobbyFullFragmentDoc = gql`
  fragment HobbyFull on Hobby {
    ...HobbyBase
    isMember
    members {
      ...EmployeeInfo
    }
  }
  ${HobbyBaseFragmentDoc}
  ${EmployeeInfoFragmentDoc}
`
export const GetHobbiesDocument = gql`
  query getHobbies {
    hobbies {
      ...HobbyBase
    }
  }
  ${HobbyBaseFragmentDoc}
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
  baseOptions?: Apollo.QueryHookOptions<GetHobbiesQuery, GetHobbiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHobbiesQuery, GetHobbiesQueryVariables>(GetHobbiesDocument, options)
}
export function useGetHobbiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHobbiesQuery, GetHobbiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHobbiesQuery, GetHobbiesQueryVariables>(GetHobbiesDocument, options)
}
export type GetHobbiesQueryHookResult = ReturnType<typeof useGetHobbiesQuery>
export type GetHobbiesLazyQueryHookResult = ReturnType<typeof useGetHobbiesLazyQuery>
export type GetHobbiesQueryResult = Apollo.QueryResult<GetHobbiesQuery, GetHobbiesQueryVariables>
export const GetHobbyDocument = gql`
  query getHobby($id: ID!) {
    hobby(id: $id) {
      ...HobbyFull
    }
  }
  ${HobbyFullFragmentDoc}
`

/**
 * __useGetHobbyQuery__
 *
 * To run a query within a React component, call `useGetHobbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHobbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHobbyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetHobbyQuery(
  baseOptions: Apollo.QueryHookOptions<GetHobbyQuery, GetHobbyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHobbyQuery, GetHobbyQueryVariables>(GetHobbyDocument, options)
}
export function useGetHobbyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHobbyQuery, GetHobbyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHobbyQuery, GetHobbyQueryVariables>(GetHobbyDocument, options)
}
export type GetHobbyQueryHookResult = ReturnType<typeof useGetHobbyQuery>
export type GetHobbyLazyQueryHookResult = ReturnType<typeof useGetHobbyLazyQuery>
export type GetHobbyQueryResult = Apollo.QueryResult<GetHobbyQuery, GetHobbyQueryVariables>
export const GetEmployeeHobbiesDocument = gql`
  query getEmployeeHobbies($id: ID!) {
    employee(id: $id) {
      id
      hobbies {
        ...HobbyBase
      }
    }
  }
  ${HobbyBaseFragmentDoc}
`

/**
 * __useGetEmployeeHobbiesQuery__
 *
 * To run a query within a React component, call `useGetEmployeeHobbiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeHobbiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeHobbiesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEmployeeHobbiesQuery(
  baseOptions: Apollo.QueryHookOptions<GetEmployeeHobbiesQuery, GetEmployeeHobbiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEmployeeHobbiesQuery, GetEmployeeHobbiesQueryVariables>(
    GetEmployeeHobbiesDocument,
    options,
  )
}
export function useGetEmployeeHobbiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEmployeeHobbiesQuery,
    GetEmployeeHobbiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEmployeeHobbiesQuery, GetEmployeeHobbiesQueryVariables>(
    GetEmployeeHobbiesDocument,
    options,
  )
}
export type GetEmployeeHobbiesQueryHookResult = ReturnType<typeof useGetEmployeeHobbiesQuery>
export type GetEmployeeHobbiesLazyQueryHookResult = ReturnType<
  typeof useGetEmployeeHobbiesLazyQuery
>
export type GetEmployeeHobbiesQueryResult = Apollo.QueryResult<
  GetEmployeeHobbiesQuery,
  GetEmployeeHobbiesQueryVariables
>
export const CreateHobbyDocument = gql`
  mutation createHobby($input: CreateHobbyInput!) {
    createHobby(input: $input) {
      ...HobbyBase
    }
  }
  ${HobbyBaseFragmentDoc}
`
export type CreateHobbyMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreateHobbyMutation, CreateHobbyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateHobbyMutation, CreateHobbyMutationVariables>(
    CreateHobbyDocument,
    options,
  )
}
export type CreateHobbyMutationHookResult = ReturnType<typeof useCreateHobbyMutation>
export type CreateHobbyMutationResult = Apollo.MutationResult<CreateHobbyMutation>
export type CreateHobbyMutationOptions = Apollo.BaseMutationOptions<
  CreateHobbyMutation,
  CreateHobbyMutationVariables
>
export const UpdateHobbyDocument = gql`
  mutation updateHobby($input: UpdateHobbyInput!) {
    updateHobby(input: $input) {
      ...HobbyBase
    }
  }
  ${HobbyBaseFragmentDoc}
`
export type UpdateHobbyMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdateHobbyMutation, UpdateHobbyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateHobbyMutation, UpdateHobbyMutationVariables>(
    UpdateHobbyDocument,
    options,
  )
}
export type UpdateHobbyMutationHookResult = ReturnType<typeof useUpdateHobbyMutation>
export type UpdateHobbyMutationResult = Apollo.MutationResult<UpdateHobbyMutation>
export type UpdateHobbyMutationOptions = Apollo.BaseMutationOptions<
  UpdateHobbyMutation,
  UpdateHobbyMutationVariables
>
export const JoinHobbyDocument = gql`
  mutation joinHobby($input: JoinHobbyInput!) {
    joinHobby(input: $input) {
      ...HobbyFull
    }
  }
  ${HobbyFullFragmentDoc}
`
export type JoinHobbyMutationFn = Apollo.MutationFunction<
  JoinHobbyMutation,
  JoinHobbyMutationVariables
>

/**
 * __useJoinHobbyMutation__
 *
 * To run a mutation, you first call `useJoinHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinHobbyMutation, { data, loading, error }] = useJoinHobbyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinHobbyMutation(
  baseOptions?: Apollo.MutationHookOptions<JoinHobbyMutation, JoinHobbyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<JoinHobbyMutation, JoinHobbyMutationVariables>(
    JoinHobbyDocument,
    options,
  )
}
export type JoinHobbyMutationHookResult = ReturnType<typeof useJoinHobbyMutation>
export type JoinHobbyMutationResult = Apollo.MutationResult<JoinHobbyMutation>
export type JoinHobbyMutationOptions = Apollo.BaseMutationOptions<
  JoinHobbyMutation,
  JoinHobbyMutationVariables
>
