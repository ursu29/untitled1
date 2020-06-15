import { Skeleton, Tabs } from 'antd'
import React, { useState } from 'react'
import { Employee, Matrix } from '../../types'
import EmployeeMatrix from './EmployeeMatrix'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id'>
  matrices?: Exclude<Matrix, 'access'>[]
}

export default function EmployeeMatricesList({ matrices, loading, employee }: Props) {
  const defaultActiveKey = matrices?.[0]?.id
  const [tabKey, setTabKey] = useState(defaultActiveKey)

  if (!loading && !matrices) return <div>No matrices yet</div>

  return (
    <Skeleton active loading={loading}>
      {!matrices && <div>No matrices yet</div>}
      {employee && (
        <Tabs
          defaultActiveKey={defaultActiveKey}
          animated={false}
          type="card"
          tabPosition="top"
          onTabClick={(key: string) => setTabKey(key)}
        >
          {matrices?.map(matrix => (
            <Tabs.TabPane tab={matrix.title} key={matrix.id}>
              <EmployeeMatrix
                matrix={matrix}
                employee={employee}
                isCurrentTab={tabKey === matrix.id}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </Skeleton>
  )
}
