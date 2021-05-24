import { useQuery } from '@apollo/client'
import { PropsWithChildren } from 'react'
import getEvaluationReviewers, { QueryType } from '../../queries/getEvaluationReviewers'
import { Employee } from '../../types'

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
