import React, { PropsWithChildren } from 'react'
import { Employee } from '../../types'
import getEvaluationReviewers, { QueryType } from '../../queries/getEvaluationReviewers'
import { useQuery } from '@apollo/react-hooks'

interface Props extends PropsWithChildren<any> {
  employee: Pick<Employee, 'id'>
}

function EmployeeEvaluationReviewers({ employee, children }: Props) {
  const { data } = useQuery<QueryType>(getEvaluationReviewers, {
    variables: {
      input: {
        toWhom: employee.id,
      },
    },
  })
  const reviewers = data?.evaluationReviewers
  return children(reviewers || [])
}

export default EmployeeEvaluationReviewers
