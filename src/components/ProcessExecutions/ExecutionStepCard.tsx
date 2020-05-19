import { Card, Icon } from 'antd'
import React, { PropsWithChildren, ReactNode } from 'react'
import { Employee } from '../../types'
import EmployeeAvatar from '../Employees/EmployeeAvatar'

interface Props extends PropsWithChildren<any> {
  title: string
  status: 'pending' | 'active' | 'done'
  employees: Pick<Employee, 'id' | 'name' | 'email'>[] | null
}

const statuses: Record<string, ReactNode> = {
  active: <Icon type="clock-circle" theme="twoTone" style={{ marginRight: 8 }} />,
  done: (
    <Icon type="check-circle" theme="twoTone" style={{ marginRight: 8 }} twoToneColor="#52C41A" />
  ),
}

function ActiveStepCard({ title, description, status, employees, children }: Props) {
  const extra = (
    <div>
      {employees?.map((i) => {
        return (
          <EmployeeAvatar key={i.id} email={i.email} size="small" showTooltip loadImmediatelly />
        )
      })}
    </div>
  )

  return (
    <Card
      size="small"
      title={
        <div style={{ display: 'flex', alignItems: 'top', padding: 0, whiteSpace: 'normal' }}>
          <span>{statuses[status]}</span>
          {title}
        </div>
      }
      extra={extra}
      style={{ opacity: status === 'pending' ? 0.7 : 1 }}
      headStyle={{ borderBottom: 0, fontWeight: 'normal' }}
      bodyStyle={!Boolean(children) ? { padding: 0 } : undefined}
    >
      <div>{description}</div>
      {children}
    </Card>
  )
}

export default ActiveStepCard
