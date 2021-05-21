import { useQuery, gql } from "@apollo/client";
import { PropsWithChildren } from 'react'
import { Access, Employee } from '../../types'

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
