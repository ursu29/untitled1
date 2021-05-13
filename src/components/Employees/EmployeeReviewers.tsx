import { useMutation, useQuery } from "@apollo/client";
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

  let getReviewersQuery,
    updateReviewersQuery = null
  if (reviewersName === 'developmentPlanReviewers') {
    getReviewersQuery = getDevelopmentPlanReviewers
    updateReviewersQuery = updateDevelopmentPlanReviewers
  } else {
    getReviewersQuery = getMatricesReviewers
    updateReviewersQuery = updateMatricesReviewers
  }

  // Get employee reviewers
  const { data, loading, error } = useQuery<
    QueryTypeEmployees & {
      employeeByEmail: {
        developmentPlanReviewers: Pick<Employee, 'id' | 'name' | 'email'>[] | null
        matricesReviewers: Pick<Employee, 'id' | 'name' | 'email'>[] | null
      }
    }
  >(getReviewersQuery, {
    variables: {
      email: props.employee?.email,
    },
  })

  // useEffect(() => {
  //   called && loading && message.loading('Loading reviewers')
  // }, [loading, called])

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

  if (loading) return <div data-cy="loading">Loading reviewers...</div>

  return (
    <Reviewers
      reviewers={data?.employeeByEmail[reviewersName]?.filter(e => !!e) || null}
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
