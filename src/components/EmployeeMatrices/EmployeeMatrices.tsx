import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { Employee, Access } from '../../types'
import EmployeeReviewers, { ReviewersNames } from '../Employees/EmployeeReviewers'
import Controls from '../UI/Controls'
import AttachMatrix from './AttachMatrix'
import EmployeeMatricesList from './EmployeeMatricesList'
import EmployeeMatricesUpdateDate from './EmployeeMatricesUpdateDate'
import ExportMatrices from './ExportMatrices'
import Legend from './Legend'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
  reviewersListAccess: Access
}

export default function EmployeeMatrices(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id: props?.employee?.id } },
    skip: !props?.employee,
  })

  const employee = data?.employees?.[0]

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
      <EmployeeMatricesList loading={loading} matrices={employee?.matrices} employee={employee} />
    </>
  )
}
