import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import EmployeeReviewers, { ReviewersNames } from '../Employees/EmployeeReviewers'
import Controls from '../UI/Controls'
import AttachMatrix from './AttachMatrix'
import EmployeeMatricesList from './EmployeeMatricesList'
import EmployeeMatriceUpdateDate from './EmployeeMatricesUpdateDate'
import ExportMatrices from './ExportMatrices'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
}

export default function EmployeeMatrices(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id: props?.employee?.id } },
    skip: !props?.employee,
  })

  const employee = data?.employees?.[0]

  return (
    <>
      <Controls back={<EmployeeMatriceUpdateDate employee={employee} />}>
        <EmployeeReviewers
          employee={props.employee!}
          reviewersName={ReviewersNames.matricesReviewers}
        />
        <AttachMatrix employee={employee} />
        <ExportMatrices matrices={employee?.matrices} employee={employee} />
      </Controls>
      <EmployeeMatricesList loading={loading} matrices={employee?.matrices} employee={employee} />
    </>
  )
}
