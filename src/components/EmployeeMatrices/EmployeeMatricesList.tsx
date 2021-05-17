import { Skeleton, Tabs } from 'antd'
import React from 'react'
import { Employee, Matrix } from '../../types'
import EmployeeMatrix from './EmployeeMatrix'
import URLAction from '../../utils/URLAction'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id' | 'isMe'>
  matrices?: Exclude<Matrix, 'access'>[]
  onComment?: any
}

export default function EmployeeMatricesList({ matrices, loading, employee, onComment }: Props) {
  const urlAction = new URLAction()
  if (!loading && !matrices) return <div data-cy="no-matrices">No matrices yet</div>

  const currentTab = urlAction.paramsGet('matrix')

  return (
    <Skeleton active loading={loading}>
      {!matrices && <div data-cy="no-matrices">No matrices yet</div>}
      {employee && (
        <div data-cy="matrix-tabs">
          <Tabs
            defaultActiveKey={matrices?.[0]?.id}
            activeKey={currentTab || matrices?.[0]?.id}
            animated={false}
            type="card"
            tabPosition="top"
            onTabClick={(key: string) => urlAction.paramsSet('matrix', key)}
          >
            {matrices?.map(matrix => (
              <Tabs.TabPane tab={matrix.title} key={matrix.id}>
                <EmployeeMatrix
                  matrix={matrix}
                  employee={employee}
                  isCurrentTab={
                    currentTab ? currentTab === matrix.id : matrices?.[0]?.id === matrix.id
                  }
                  onComment={onComment}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </Skeleton>
  )
}
