/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type GetFeedbacksQueryVariables = Types.Exact<{
  input: Types.FeedbacksInput
}>

export type GetFeedbacksQuery = { __typename?: 'Query' } & {
  feedbacks?: Types.Maybe<
    Array<
      { __typename?: 'Feedback' } & Pick<Types.Feedback, 'id' | 'about' | 'text' | 'createdAt'> & {
          project?: Types.Maybe<
            { __typename?: 'Project' } & Pick<Types.Project, 'id' | 'name' | 'code'>
          >
          comments?: Types.Maybe<
            Array<
              { __typename?: 'FeedbackComment' } & Pick<
                Types.FeedbackComment,
                'id' | 'text' | 'createdAt'
              >
            >
          >
        }
    >
  >
}

export type AddFeedbackMutationVariables = Types.Exact<{
  input: Types.FeedbackInput
}>

export type AddFeedbackMutation = { __typename?: 'Mutation' } & {
  addFeedback?: Types.Maybe<{ __typename?: 'Feedback' } & Pick<Types.Feedback, 'id'>>
}

export type ReplyFeedbackMutationVariables = Types.Exact<{
  input: Types.FeedbackReplyInput
}>

export type ReplyFeedbackMutation = { __typename?: 'Mutation' } & {
  replyFeedback?: Types.Maybe<
    { __typename?: 'FeedbackComment' } & Pick<Types.FeedbackComment, 'id' | 'text' | 'createdAt'>
  >
}

export type GetFeedbackAccessQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetFeedbackAccessQuery = { __typename?: 'Query' } & {
  feedbacksAccess?: Types.Maybe<{ __typename?: 'Access' } & Pick<Types.Access, 'write'>>
}

export const GetFeedbacksDocument = gql`
  query getFeedbacks($input: FeedbacksInput!) {
    feedbacks(input: $input) {
      id
      about
      project {
        id
        name
        code
      }
      text
      createdAt
      comments {
        id
        text
        createdAt
      }
    }
  }
`

/**
 * __useGetFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbacksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFeedbacksQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(
    GetFeedbacksDocument,
    baseOptions,
  )
}
export function useGetFeedbacksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFeedbacksQuery,
    GetFeedbacksQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(
    GetFeedbacksDocument,
    baseOptions,
  )
}
export type GetFeedbacksQueryHookResult = ReturnType<typeof useGetFeedbacksQuery>
export type GetFeedbacksLazyQueryHookResult = ReturnType<typeof useGetFeedbacksLazyQuery>
export type GetFeedbacksQueryResult = ApolloReactCommon.QueryResult<
  GetFeedbacksQuery,
  GetFeedbacksQueryVariables
>
export const AddFeedbackDocument = gql`
  mutation addFeedback($input: FeedbackInput!) {
    addFeedback(input: $input) {
      id
    }
  }
`
export type AddFeedbackMutationFn = ApolloReactCommon.MutationFunction<
  AddFeedbackMutation,
  AddFeedbackMutationVariables
>

/**
 * __useAddFeedbackMutation__
 *
 * To run a mutation, you first call `useAddFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFeedbackMutation, { data, loading, error }] = useAddFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFeedbackMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddFeedbackMutation,
    AddFeedbackMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<AddFeedbackMutation, AddFeedbackMutationVariables>(
    AddFeedbackDocument,
    baseOptions,
  )
}
export type AddFeedbackMutationHookResult = ReturnType<typeof useAddFeedbackMutation>
export type AddFeedbackMutationResult = ApolloReactCommon.MutationResult<AddFeedbackMutation>
export type AddFeedbackMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddFeedbackMutation,
  AddFeedbackMutationVariables
>
export const ReplyFeedbackDocument = gql`
  mutation replyFeedback($input: FeedbackReplyInput!) {
    replyFeedback(input: $input) {
      id
      text
      createdAt
    }
  }
`
export type ReplyFeedbackMutationFn = ApolloReactCommon.MutationFunction<
  ReplyFeedbackMutation,
  ReplyFeedbackMutationVariables
>

/**
 * __useReplyFeedbackMutation__
 *
 * To run a mutation, you first call `useReplyFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyFeedbackMutation, { data, loading, error }] = useReplyFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReplyFeedbackMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReplyFeedbackMutation,
    ReplyFeedbackMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ReplyFeedbackMutation, ReplyFeedbackMutationVariables>(
    ReplyFeedbackDocument,
    baseOptions,
  )
}
export type ReplyFeedbackMutationHookResult = ReturnType<typeof useReplyFeedbackMutation>
export type ReplyFeedbackMutationResult = ApolloReactCommon.MutationResult<ReplyFeedbackMutation>
export type ReplyFeedbackMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ReplyFeedbackMutation,
  ReplyFeedbackMutationVariables
>
export const GetFeedbackAccessDocument = gql`
  query getFeedbackAccess {
    feedbacksAccess {
      write
    }
  }
`

/**
 * __useGetFeedbackAccessQuery__
 *
 * To run a query within a React component, call `useGetFeedbackAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbackAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbackAccessQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedbackAccessQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetFeedbackAccessQuery,
    GetFeedbackAccessQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetFeedbackAccessQuery, GetFeedbackAccessQueryVariables>(
    GetFeedbackAccessDocument,
    baseOptions,
  )
}
export function useGetFeedbackAccessLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFeedbackAccessQuery,
    GetFeedbackAccessQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetFeedbackAccessQuery, GetFeedbackAccessQueryVariables>(
    GetFeedbackAccessDocument,
    baseOptions,
  )
}
export type GetFeedbackAccessQueryHookResult = ReturnType<typeof useGetFeedbackAccessQuery>
export type GetFeedbackAccessLazyQueryHookResult = ReturnType<typeof useGetFeedbackAccessLazyQuery>
export type GetFeedbackAccessQueryResult = ApolloReactCommon.QueryResult<
  GetFeedbackAccessQuery,
  GetFeedbackAccessQueryVariables
>
