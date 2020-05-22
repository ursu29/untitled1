import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import Reviewers from './Reviewers'
import { QueryType as QueryTypeEmployees } from '../../queries/getEmployees'
import { reviewersQuery } from '../../queries/employeeReviewers'
import { Employee } from '../../types'
import message from '../../message'

type Props = {
  employee: Pick<Employee, 'email' | 'isMe'>
  reviewersName: ReviewersNames
}

export enum ReviewersNames {
  developmentPlanReviewers = 'developmentPlanReviewers',
  matricesReviewers = 'matricesReviewers',
}

const EmployeeReviewers = (props: Props) => {
  const { reviewersName } = props
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

  // Update employee reviewers
  const [updateReviewers] = useMutation(updateReviewersQuery, {
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
  })

  return (
    <Reviewers
      reviewers={data?.employeeByEmail[reviewersName] || null}
      isAvatarsShown={!error && !!data}
      isAddButtonShown={!error && !props.employee?.isMe}
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
