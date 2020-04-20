import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import Controls from '../UI/Controls'
import EmployeeMatricesList from './EmployeeMatricesList'
import AttachMatrix from './AttachMatrix'
import DetachMatrix from './DetachMatrix'
import EmployeeMatrix from './EmployeeMatrix'
import ExportMatrices from './ExportMatrices'

interface Props {
  employee?: Pick<Employee, 'id' | 'name'>
}

export default function EmployeeMatrices(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeMatrices, {
    variables: { input: { id: props?.employee?.id } },
    skip: !props?.employee,
  })

  const employee = data?.employees?.[0]

  return (
    <>
      <Controls>
        <AttachMatrix employee={employee} />
        <ExportMatrices matrices={employee?.matrices} employee={employee} />
      </Controls>
      <EmployeeMatricesList
        loading={loading}
        matrices={employee?.matrices}
        employee={employee}
        EmployeeMatrix={EmployeeMatrix}
        DetachMatrix={DetachMatrix}
      />
    </>
  )
}
