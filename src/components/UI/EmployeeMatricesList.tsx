import { Skeleton, Tabs } from 'antd'
import React from 'react'
import { Employee, Matrix } from '../../types'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id'>
  matrices?: Exclude<Matrix, 'access'>[]
  EmployeeMatrix: React.FC<any>
  DetachMatrix: React.FC<any>
}

export default function EmployeeMatricesList({
  matrices,
  loading,
  employee,
  EmployeeMatrix,
  DetachMatrix,
}: Props) {
  if (!loading && !matrices) return <div>No matrices yet</div>

  const defaultActiveKey = matrices?.[0]?.id
  return (
    <Skeleton active loading={loading}>
      {!matrices && <div>No matrices yet</div>}
      {matrices && (
        <Tabs defaultActiveKey={defaultActiveKey} animated={false} type="card" tabPosition="top">
          {matrices?.map(matrix => (
            <Tabs.TabPane tab={matrix.title} key={matrix.id}>
              <EmployeeMatrix matrix={matrix} employee={employee} DetachMatrix={DetachMatrix} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </Skeleton>
  )
}
