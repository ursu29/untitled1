import React from 'react'
import { Tabs, Skeleton } from 'antd'
import { Matrix, Employee } from '../../types'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id'>
  matrices?: Pick<Matrix, 'id' | 'title' | 'description'>[]
  EmployeeMatrixComponent: any
}

export default function EmployeeMatricesList({
  matrices,
  loading,
  employee,
  EmployeeMatrixComponent,
}: Props) {
  if (!loading && !matrices) return <div>No matrices yet</div>

  const defaultActiveKey = matrices?.[0].id
  return (
    <Skeleton active loading={loading}>
      <Tabs defaultActiveKey={defaultActiveKey} size="small" type="line" tabPosition="left">
        {matrices?.map(matrix => (
          <Tabs.TabPane tab={matrix.title} key={matrix.id}>
            <EmployeeMatrixComponent matrix={matrix} employee={employee} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Skeleton>
  )
}
