import React from 'react'
import { Tabs, Skeleton } from 'antd'
import { Matrix, Employee } from '../../types'
import Controls from './Controls'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id'>
  matrices?: Exclude<Matrix, 'access'>[]
  EmployeeMatrixComponent: React.FC<any>
  DetachMatrix: React.FC<any>
  ExportMatrixToExcel: React.FC<any>
}

export default function EmployeeMatricesList({
  matrices,
  loading,
  employee,
  EmployeeMatrixComponent,
  DetachMatrix,
  ExportMatrixToExcel,
}: Props) {
  if (!loading && !matrices) return <div>No matrices yet</div>

  const defaultActiveKey = matrices?.[0]?.id
  return (
    <Skeleton active loading={loading}>
      {!matrices && <div>No matrices yet</div>}
      {matrices && (
        <Tabs defaultActiveKey={defaultActiveKey} size="small" type="line" tabPosition="left">
          {matrices?.map(matrix => (
            <Tabs.TabPane tab={matrix.title} key={matrix.id}>
              <EmployeeMatrixComponent
                matrix={matrix}
                employee={employee}
                DetachMatrix={DetachMatrix}
                ExportMatrixToExcel={ExportMatrixToExcel}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </Skeleton>
  )
}
