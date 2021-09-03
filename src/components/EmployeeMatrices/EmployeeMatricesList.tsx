import { Skeleton, Tabs } from 'antd'
import React, { useEffect } from 'react'
import { ArchivedMatrixData, Employee, Matrix } from '../../types'
import URLAction from '../../utils/URLAction'
import EmployeeMatrix from './EmployeeMatrix'

interface Props {
  loading: boolean
  employee?: Pick<Employee, 'id' | 'isMe'>
  matrices?: Exclude<Matrix, 'access'>[]
  onComment?: any
  onTabChange?: any
  archivedMatrixData?: { archivedMatrix: ArchivedMatrixData }
  archiveLoading: boolean
  isArchivedChosen: boolean
}

export default function EmployeeMatricesList({
  onTabChange,
  matrices,
  loading,
  employee,
  onComment,
  archivedMatrixData,
  archiveLoading,
  isArchivedChosen,
}: Props) {
  const urlAction = new URLAction()

  let currentTab = urlAction.paramsGet('matrix')

  useEffect(() => {
    onTabChange(currentTab || matrices?.[0]?.id)
    //eslint-disable-next-line
  }, [])

  if (!loading && !matrices) return <div data-cy="no-matrices">No matrices yet</div>

  return (
    <Skeleton active loading={loading}>
      {!matrices && <div data-cy="no-matrices">No matrices yet</div>}
      {employee && (
        <div data-cy="matrix-tabs" style={{ marginTop: '21px' }}>
          <Tabs
            className="matrix-tabs"
            defaultActiveKey={matrices?.[0]?.id}
            activeKey={currentTab || matrices?.[0]?.id}
            animated={false}
            type="line"
            tabPosition="top"
            onTabClick={(key: string) => {
              urlAction.paramsSet('matrix', key)
              onTabChange(key)
            }}
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
                  archivedMatrixData={archivedMatrixData}
                  archiveLoading={archiveLoading}
                  isArchivedChosen={isArchivedChosen}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </Skeleton>
  )
}
