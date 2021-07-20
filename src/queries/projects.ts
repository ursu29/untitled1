/**
 * DO NOT EDIT THIS FILE
 * This file was automatically generated from GraphQL queries and should not be edited.
 * Please change queries in *.graphql file and run codegen script if necessary.
 */
import * as Types from '../types/graphql'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ProjectDetailsFragment = { __typename?: 'Project' } & Pick<
  Types.Project,
  'id' | 'name' | 'code' | 'description'
>

export type GetProjectByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']
}>

export type GetProjectByCodeQuery = { __typename?: 'Query' } & {
  projectByCode?: Types.Maybe<
    { __typename?: 'Project' } & {
      scrumMasters?: Types.Maybe<
        Array<{ __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'email'>>
      >
      employeeProjects?: Types.Maybe<
        Array<
          { __typename?: 'EmployeeProject' } & Pick<
            Types.EmployeeProject,
            'id' | 'capacity' | 'isExtraCapacity'
          > & {
              employee?: Types.Maybe<
                { __typename?: 'Employee' } & Pick<Types.Employee, 'id' | 'email' | 'name'>
              >
            }
        >
      >
    } & ProjectDetailsFragment
  >
}

export type UpdateProjectMutationVariables = Types.Exact<{
  input: Types.UpdateProjectInput
}>

export type UpdateProjectMutation = { __typename?: 'Mutation' } & {
  updateProject?: Types.Maybe<{ __typename?: 'Project' } & Pick<Types.Project, 'id'>>
}

export type CreateProjectMutationVariables = Types.Exact<{
  input: Types.CreateProjectInput
}>

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject?: Types.Maybe<{ __typename?: 'Project' } & Pick<Types.Project, 'id'>>
}

export const ProjectDetailsFragmentDoc = gql`
  fragment ProjectDetails on Project {
    id
    name
    code
    description
  }
`
export const GetProjectByCodeDocument = gql`
  query getProjectByCode($code: String!) {
    projectByCode(code: $code) {
      ...ProjectDetails
      scrumMasters {
        id
        email
      }
      employeeProjects {
        id
        capacity
        isExtraCapacity
        employee {
          id
          email
          name
        }
      }
    }
  }
  ${ProjectDetailsFragmentDoc}
`

/**
 * __useGetProjectByCodeQuery__
 *
 * To run a query within a React component, call `useGetProjectByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetProjectByCodeQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectByCodeQuery, GetProjectByCodeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectByCodeQuery, GetProjectByCodeQueryVariables>(
    GetProjectByCodeDocument,
    options,
  )
}
export function useGetProjectByCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByCodeQuery, GetProjectByCodeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectByCodeQuery, GetProjectByCodeQueryVariables>(
    GetProjectByCodeDocument,
    options,
  )
}
export type GetProjectByCodeQueryHookResult = ReturnType<typeof useGetProjectByCodeQuery>
export type GetProjectByCodeLazyQueryHookResult = ReturnType<typeof useGetProjectByCodeLazyQuery>
export type GetProjectByCodeQueryResult = Apollo.QueryResult<
  GetProjectByCodeQuery,
  GetProjectByCodeQueryVariables
>
export const UpdateProjectDocument = gql`
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
    }
  }
`
export type UpdateProjectMutationFn = Apollo.MutationFunction<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(
    UpdateProjectDocument,
    options,
  )
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>
export const CreateProjectDocument = gql`
  mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    options,
  )
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>
