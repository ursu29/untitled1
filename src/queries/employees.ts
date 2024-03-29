/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type EmployeeDetailsFragment = { __typename?: 'Employee' } & Pick<
  Types.Employee,
  | 'id'
  | 'name'
  | 'location'
  | 'position'
  | 'phoneNumber'
  | 'email'
  | 'isMe'
  | 'startDate'
  | 'birthday'
>

export type GetEmployeeQueryVariables = Types.Exact<{
  email: Types.Scalars['String']
}>

export type GetEmployeeQuery = { __typename?: 'Query' } & {
  employeeByEmail?: Types.Maybe<{ __typename?: 'Employee' } & EmployeeDetailsFragment>
}

export type GetEmployeeDetailedQueryVariables = Types.Exact<{
  email: Types.Scalars['String']
}>

export type GetEmployeeDetailedQuery = { __typename?: 'Query' } & {
  employeeByEmail?: Types.Maybe<
    { __typename?: 'Employee' } & Pick<Types.Employee, 'bonuses'> & {
        agileManager?: Types.Maybe<{ __typename?: 'Employee' } & EmployeeDetailsFragment>
      } & EmployeeDetailsFragment
  >
}

export type GetEmployeesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetEmployeesQuery = { __typename?: 'Query' } & {
  employees?: Types.Maybe<Array<{ __typename?: 'Employee' } & EmployeeDetailsFragment>>
}

export type UpdateEmployeeMutationVariables = Types.Exact<{
  input: Types.UpdateEmployeeInput
}>

export type UpdateEmployeeMutation = { __typename?: 'Mutation' } & {
  updateEmployee?: Types.Maybe<{ __typename?: 'Employee' } & Pick<Types.Employee, 'id'>>
}

export type CreateEmployeeMutationVariables = Types.Exact<{
  input: Types.CreateEmployeeInput
}>

export type CreateEmployeeMutation = { __typename?: 'Mutation' } & {
  createEmployee?: Types.Maybe<{ __typename?: 'Employee' } & Pick<Types.Employee, 'id'>>
}

export type UpdateEmployeeProjectsMutationVariables = Types.Exact<{
  input: Array<Types.UpdateEmployeeProjectsInput> | Types.UpdateEmployeeProjectsInput
}>

export type UpdateEmployeeProjectsMutation = { __typename?: 'Mutation' } & {
  updateEmployeeProjects?: Types.Maybe<
    Array<Types.Maybe<{ __typename?: 'EmployeeProject' } & Pick<Types.EmployeeProject, 'id'>>>
  >
}

export type RemoveEmployeeProjectsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['String']> | Types.Scalars['String']
}>

export type RemoveEmployeeProjectsMutation = { __typename?: 'Mutation' } & {
  removeEmployeeProjects?: Types.Maybe<
    Array<Types.Maybe<{ __typename?: 'EmployeeProject' } & Pick<Types.EmployeeProject, 'id'>>>
  >
}

export type CreateEmployeeProjectsMutationVariables = Types.Exact<{
  input: Array<Types.CreateEmployeeProjectsInput> | Types.CreateEmployeeProjectsInput
}>

export type CreateEmployeeProjectsMutation = { __typename?: 'Mutation' } & {
  createEmployeeProjects?: Types.Maybe<
    Array<Types.Maybe<{ __typename?: 'EmployeeProject' } & Pick<Types.EmployeeProject, 'id'>>>
  >
}

export const EmployeeDetailsFragmentDoc = gql`
  fragment EmployeeDetails on Employee {
    id
    name
    location
    position
    phoneNumber
    email
    isMe
    startDate
    birthday
  }
`
export const GetEmployeeDocument = gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
    }
  }
  ${EmployeeDetailsFragmentDoc}
`

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetEmployeeQuery(
  baseOptions: Apollo.QueryHookOptions<GetEmployeeQuery, GetEmployeeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEmployeeQuery, GetEmployeeQueryVariables>(GetEmployeeDocument, options)
}
export function useGetEmployeeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeQuery, GetEmployeeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEmployeeQuery, GetEmployeeQueryVariables>(
    GetEmployeeDocument,
    options,
  )
}
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>
export type GetEmployeeQueryResult = Apollo.QueryResult<GetEmployeeQuery, GetEmployeeQueryVariables>
export const GetEmployeeDetailedDocument = gql`
  query getEmployeeDetailed($email: String!) {
    employeeByEmail(email: $email) {
      ...EmployeeDetails
      agileManager {
        ...EmployeeDetails
      }
      bonuses
    }
  }
  ${EmployeeDetailsFragmentDoc}
`

/**
 * __useGetEmployeeDetailedQuery__
 *
 * To run a query within a React component, call `useGetEmployeeDetailedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeDetailedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeDetailedQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetEmployeeDetailedQuery(
  baseOptions: Apollo.QueryHookOptions<GetEmployeeDetailedQuery, GetEmployeeDetailedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEmployeeDetailedQuery, GetEmployeeDetailedQueryVariables>(
    GetEmployeeDetailedDocument,
    options,
  )
}
export function useGetEmployeeDetailedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEmployeeDetailedQuery,
    GetEmployeeDetailedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEmployeeDetailedQuery, GetEmployeeDetailedQueryVariables>(
    GetEmployeeDetailedDocument,
    options,
  )
}
export type GetEmployeeDetailedQueryHookResult = ReturnType<typeof useGetEmployeeDetailedQuery>
export type GetEmployeeDetailedLazyQueryHookResult = ReturnType<
  typeof useGetEmployeeDetailedLazyQuery
>
export type GetEmployeeDetailedQueryResult = Apollo.QueryResult<
  GetEmployeeDetailedQuery,
  GetEmployeeDetailedQueryVariables
>
export const GetEmployeesDocument = gql`
  query getEmployees {
    employees {
      ...EmployeeDetails
    }
  }
  ${EmployeeDetailsFragmentDoc}
`

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(
    GetEmployeesDocument,
    options,
  )
}
export function useGetEmployeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(
    GetEmployeesDocument,
    options,
  )
}
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>
export type GetEmployeesQueryResult = Apollo.QueryResult<
  GetEmployeesQuery,
  GetEmployeesQueryVariables
>
export const UpdateEmployeeDocument = gql`
  mutation updateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
    }
  }
`
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<
  UpdateEmployeeMutation,
  UpdateEmployeeMutationVariables
>

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(
    UpdateEmployeeDocument,
    options,
  )
}
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>
export type UpdateEmployeeMutationResult = Apollo.MutationResult<UpdateEmployeeMutation>
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEmployeeMutation,
  UpdateEmployeeMutationVariables
>
export const CreateEmployeeDocument = gql`
  mutation createEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
    }
  }
`
export type CreateEmployeeMutationFn = Apollo.MutationFunction<
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables
>

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(
    CreateEmployeeDocument,
    options,
  )
}
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables
>
export const UpdateEmployeeProjectsDocument = gql`
  mutation updateEmployeeProjects($input: [UpdateEmployeeProjectsInput!]!) {
    updateEmployeeProjects(input: $input) {
      id
    }
  }
`
export type UpdateEmployeeProjectsMutationFn = Apollo.MutationFunction<
  UpdateEmployeeProjectsMutation,
  UpdateEmployeeProjectsMutationVariables
>

/**
 * __useUpdateEmployeeProjectsMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeProjectsMutation, { data, loading, error }] = useUpdateEmployeeProjectsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployeeProjectsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEmployeeProjectsMutation,
    UpdateEmployeeProjectsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateEmployeeProjectsMutation,
    UpdateEmployeeProjectsMutationVariables
  >(UpdateEmployeeProjectsDocument, options)
}
export type UpdateEmployeeProjectsMutationHookResult = ReturnType<
  typeof useUpdateEmployeeProjectsMutation
>
export type UpdateEmployeeProjectsMutationResult =
  Apollo.MutationResult<UpdateEmployeeProjectsMutation>
export type UpdateEmployeeProjectsMutationOptions = Apollo.BaseMutationOptions<
  UpdateEmployeeProjectsMutation,
  UpdateEmployeeProjectsMutationVariables
>
export const RemoveEmployeeProjectsDocument = gql`
  mutation removeEmployeeProjects($ids: [String!]!) {
    removeEmployeeProjects(ids: $ids) {
      id
    }
  }
`
export type RemoveEmployeeProjectsMutationFn = Apollo.MutationFunction<
  RemoveEmployeeProjectsMutation,
  RemoveEmployeeProjectsMutationVariables
>

/**
 * __useRemoveEmployeeProjectsMutation__
 *
 * To run a mutation, you first call `useRemoveEmployeeProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEmployeeProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEmployeeProjectsMutation, { data, loading, error }] = useRemoveEmployeeProjectsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveEmployeeProjectsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveEmployeeProjectsMutation,
    RemoveEmployeeProjectsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveEmployeeProjectsMutation,
    RemoveEmployeeProjectsMutationVariables
  >(RemoveEmployeeProjectsDocument, options)
}
export type RemoveEmployeeProjectsMutationHookResult = ReturnType<
  typeof useRemoveEmployeeProjectsMutation
>
export type RemoveEmployeeProjectsMutationResult =
  Apollo.MutationResult<RemoveEmployeeProjectsMutation>
export type RemoveEmployeeProjectsMutationOptions = Apollo.BaseMutationOptions<
  RemoveEmployeeProjectsMutation,
  RemoveEmployeeProjectsMutationVariables
>
export const CreateEmployeeProjectsDocument = gql`
  mutation createEmployeeProjects($input: [CreateEmployeeProjectsInput!]!) {
    createEmployeeProjects(input: $input) {
      id
    }
  }
`
export type CreateEmployeeProjectsMutationFn = Apollo.MutationFunction<
  CreateEmployeeProjectsMutation,
  CreateEmployeeProjectsMutationVariables
>

/**
 * __useCreateEmployeeProjectsMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeProjectsMutation, { data, loading, error }] = useCreateEmployeeProjectsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeProjectsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEmployeeProjectsMutation,
    CreateEmployeeProjectsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateEmployeeProjectsMutation,
    CreateEmployeeProjectsMutationVariables
  >(CreateEmployeeProjectsDocument, options)
}
export type CreateEmployeeProjectsMutationHookResult = ReturnType<
  typeof useCreateEmployeeProjectsMutation
>
export type CreateEmployeeProjectsMutationResult =
  Apollo.MutationResult<CreateEmployeeProjectsMutation>
export type CreateEmployeeProjectsMutationOptions = Apollo.BaseMutationOptions<
  CreateEmployeeProjectsMutation,
  CreateEmployeeProjectsMutationVariables
>
