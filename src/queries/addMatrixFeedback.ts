/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type AddMatrixFeedbackMutationVariables = Types.Exact<{
  input: Types.MatrixFeedbackInput
}>

export type AddMatrixFeedbackMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'addMatrixFeedback'
>

export const AddMatrixFeedbackDocument = gql`
  mutation addMatrixFeedback($input: MatrixFeedbackInput!) {
    addMatrixFeedback(input: $input)
  }
`
export type AddMatrixFeedbackMutationFn = ApolloReactCommon.MutationFunction<
  AddMatrixFeedbackMutation,
  AddMatrixFeedbackMutationVariables
>

/**
 * __useAddMatrixFeedbackMutation__
 *
 * To run a mutation, you first call `useAddMatrixFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMatrixFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMatrixFeedbackMutation, { data, loading, error }] = useAddMatrixFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMatrixFeedbackMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddMatrixFeedbackMutation,
    AddMatrixFeedbackMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddMatrixFeedbackMutation,
    AddMatrixFeedbackMutationVariables
  >(AddMatrixFeedbackDocument, baseOptions)
}
export type AddMatrixFeedbackMutationHookResult = ReturnType<typeof useAddMatrixFeedbackMutation>
export type AddMatrixFeedbackMutationResult = ApolloReactCommon.MutationResult<
  AddMatrixFeedbackMutation
>
export type AddMatrixFeedbackMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddMatrixFeedbackMutation,
  AddMatrixFeedbackMutationVariables
>
