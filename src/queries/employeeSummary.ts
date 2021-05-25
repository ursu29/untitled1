/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { HobbyBaseFragment } from './hobbies'
import { gql } from '@apollo/client'
import { HobbyBaseFragmentDoc } from './hobbies'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetEmployeeSummaryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetEmployeeSummaryQuery = { __typename?: 'Query' } & {
  employee?: Types.Maybe<
    { __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'about'> & {
        hobbies: Array<{ __typename?: 'Hobby' } & HobbyBaseFragment>
      }
  >
}

export type UpdateEmployeeAboutMutationVariables = Types.Exact<{
  input: Types.UpdateEmployeeInput
}>

export type UpdateEmployeeAboutMutation = { __typename?: 'Mutation' } & {
  updateEmployee?: Types.Maybe<{ __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'about'>>
}

export const GetEmployeeSummaryDocument = gql`
  query getEmployeeSummary($id: ID!) {
    employee(id: $id) {
      id
      about
      hobbies {
        ...HobbyBase
      }
    }
  }
  ${HobbyBaseFragmentDoc}
`

/**
 * __useGetEmployeeSummaryQuery__
 *
 * To run a query within a React component, call `useGetEmployeeSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeSummaryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEmployeeSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<GetEmployeeSummaryQuery, GetEmployeeSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEmployeeSummaryQuery, GetEmployeeSummaryQueryVariables>(
    GetEmployeeSummaryDocument,
    options,
  )
}
export function useGetEmployeeSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEmployeeSummaryQuery,
    GetEmployeeSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEmployeeSummaryQuery, GetEmployeeSummaryQueryVariables>(
    GetEmployeeSummaryDocument,
    options,
  )
}
export type GetEmployeeSummaryQueryHookResult = ReturnType<typeof useGetEmployeeSummaryQuery>
export type GetEmployeeSummaryLazyQueryHookResult = ReturnType<
  typeof useGetEmployeeSummaryLazyQuery
>
export type GetEmployeeSummaryQueryResult = Apollo.QueryResult<
  GetEmployeeSummaryQuery,
  GetEmployeeSummaryQueryVariables
>
export const UpdateEmployeeAboutDocument = gql`
  mutation updateEmployeeAbout($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
      about
    }
  }
`
export type UpdateEmployeeAboutMutationFn = Apollo.MutationFunction<
  UpdateEmployeeAboutMutation,
  UpdateEmployeeAboutMutationVariables
>

/**
 * __useUpdateEmployeeAboutMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeAboutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeAboutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeAboutMutation, { data, loading, error }] = useUpdateEmployeeAboutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployeeAboutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEmployeeAboutMutation,
    UpdateEmployeeAboutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEmployeeAboutMutation, UpdateEmployeeAboutMutationVariables>(
    UpdateEmployeeAboutDocument,
    options,
  )
}
export type UpdateEmployeeAboutMutationHookResult = ReturnType<
  typeof useUpdateEmployeeAboutMutation
>
export type UpdateEmployeeAboutMutationResult = Apollo.MutationResult<UpdateEmployeeAboutMutation>
export type UpdateEmployeeAboutMutationOptions = Apollo.BaseMutationOptions<
  UpdateEmployeeAboutMutation,
  UpdateEmployeeAboutMutationVariables
>
