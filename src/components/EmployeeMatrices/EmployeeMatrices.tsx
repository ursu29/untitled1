import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployeeMatrices, { QueryType } from '../../queries/getEmployeeMatrices'
import { Employee } from '../../types'
import Controls from '../UI/Controls'
import EmployeeMatricesList from '../UI/EmployeeMatricesList'
import AttachMatrix from './AttachMatrix'
import DetachMatrix from './DetachMatrix'
import ExportMatrixToExcel from './ExportMatrixToExcel'
import EmployeeMatrix from './EmployeeMatrix'

interface Props {
  employee?: Pick<Employee, 'id'>
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
      </Controls>
      <EmployeeMatricesList
        loading={loading}
        matrices={employee?.matrices}
        employee={employee}
        EmployeeMatrixComponent={EmployeeMatrix}
        DetachMatrix={DetachMatrix}
        ExportMatrixToExcel={ExportMatrixToExcel}
      />
    </>
  )
}
