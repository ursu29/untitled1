import React, { PropsWithChildren } from 'react'
import { Employee, Access } from '../../types'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const query = gql`
  query evaluationReviewersAccess($input: EvaluationReviewersAccessInput) {
    evaluationReviewersAccess(input: $input) {
      read
      write
    }
  }
`

interface Props extends PropsWithChildren<any> {
  employee: Pick<Employee, 'id'>
}

function EmployeeEvaluationAccessReviewers({ employee, children }: Props) {
  const { data } = useQuery<{ evaluationReviewersAccess: Access }>(query, {
    variables: {
      input: {
        toWhom: employee.id,
      },
    },
  })
  return children(
    data?.evaluationReviewersAccess || {
      read: false,
      write: false,
    },
  )
}

export default EmployeeEvaluationAccessReviewers
