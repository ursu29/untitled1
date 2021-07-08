import { useQuery, useMutation, gql } from '@apollo/client'
import React from 'react'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { Employee, Access } from '../../types/graphql'
import EmployeeReviewers, { ReviewersNames } from '../Employees/EmployeeReviewers'
import Controls from '../UI/Controls'
import AttachMatrix from './AttachMatrix'
import EmployeeMatricesList from './EmployeeMatricesList'
import EmployeeMatricesUpdateDate from './EmployeeMatricesUpdateDate'
import ExportMatrices from './ExportMatrices'
import Legend from './Legend'
import message from '../../message'

interface Props {
  employee?: Pick<Employee, 'id' | 'email' | 'isMe'>
  reviewersListAccess: Access
}

export default function EmployeeMatrices(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id: props?.employee?.id } },
    skip: !props?.employee,
  })

  const employee = data?.employees?.[0]

  //Comment matrix
  const commentMutation = gql`
    mutation commentMatrix($input: CommentMatrixInput) {
      commentMatrix(input: $input) {
        id
      }
    }
  `
  const [comment] = useMutation(commentMutation, {
    onCompleted: () => message.success('Matrix is updated'),
    onError: message.error,
  })

  return (
    <>
      <Controls back={<EmployeeMatricesUpdateDate employee={employee} />}>
        {props.reviewersListAccess.read && (
          <EmployeeReviewers
            employee={props.employee!}
            reviewersName={ReviewersNames.matricesReviewers}
            reviewersListAccess={props.reviewersListAccess}
          />
        )}
        <AttachMatrix employee={employee} />
        <ExportMatrices matrices={employee?.matrices} employee={employee} />
      </Controls>
      <Legend />
      <EmployeeMatricesList
        loading={loading}
        matrices={employee?.matrices}
        employee={employee}
        onComment={comment}
      />
    </>
  )
}
