import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import Reviewers from './Reviewers'
import { QueryType as QueryTypeEmployees } from '../../queries/getEmployees'
import { reviewersQuery } from '../../queries/employeeReviewers'
import { Employee, Access } from '../../types'
import message from '../../message'

type Props = {
  employee: Pick<Employee, 'email' | 'isMe'>
  reviewersName: ReviewersNames
  reviewersListAccess: Access
}

export enum ReviewersNames {
  developmentPlanReviewers = 'developmentPlanReviewers',
  matricesReviewers = 'matricesReviewers',
}

const EmployeeReviewers = (props: Props) => {
  const { reviewersName } = props
  const { read, write } = props.reviewersListAccess

  const {
    getDevelopmentPlanReviewers,
    getMatricesReviewers,
    updateDevelopmentPlanReviewers,
    updateMatricesReviewers,
  } = reviewersQuery

  const [getReviewersQuery, updateReviewersQuery] =
    reviewersName === 'developmentPlanReviewers'
      ? [getDevelopmentPlanReviewers, updateDevelopmentPlanReviewers]
      : reviewersName === 'matricesReviewers'
      ? [getMatricesReviewers, updateMatricesReviewers]
      : [null]

  // Get employee reviewers
  const { data, loading, error } = useQuery<
    QueryTypeEmployees & {
      employeeByEmail: {
        developmentPlanReviewers: Pick<Employee, 'id' | 'name' | 'email' | 'avatar'>[] | null
        matricesReviewers: Pick<Employee, 'id' | 'name' | 'email' | 'avatar'>[] | null
      }
    }
  >(getReviewersQuery, {
    variables: {
      email: props.employee?.email,
    },
  })

  useEffect(() => {
    loading && message.loading('Loading reviewers')
  }, [loading])

  // Update employee reviewers
  const [updateReviewers, { loading: updateReviewersLoading }] = useMutation(updateReviewersQuery, {
    refetchQueries: [
      {
        query: getReviewersQuery,
        variables: {
          email: props.employee?.email,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Reviewers have been updated')
    },
    onError: message.error,
  })

  useEffect(() => {
    updateReviewersLoading && message.loading('Updating reviewers...')
  }, [updateReviewersLoading])

  return (
    <Reviewers
      reviewers={data?.employeeByEmail[reviewersName] || null}
      isAvatarsShown={read && !error && !!data}
      isAddButtonShown={write && !error && !props.employee?.isMe}
      selectIsLoading={loading}
      onBlur={(values: any) =>
        updateReviewers({
          variables: {
            input: {
              employeeEmail: props.employee?.email,
              reviewers: values,
            },
          },
        })
      }
    />
  )
}

export default EmployeeReviewers