import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons'
import { Card } from 'antd'
import React, { PropsWithChildren, ReactNode } from 'react'
import { Employee } from '../../types'
import Avatar from '../Avatar'

interface Props extends PropsWithChildren<any> {
  title: string
  status: 'pending' | 'active' | 'done'
  employees: Pick<Employee, 'id' | 'name' | 'email'>[] | null
}

const statuses: Record<string, ReactNode> = {
  active: <ClockCircleTwoTone style={{ marginRight: 8 }} />,
  done: <CheckCircleTwoTone style={{ marginRight: 8 }} twoToneColor="#52C41A" />,
}

function ActiveStepCard({ title, description, status, employees, children }: Props) {
  const extra = (
    <div>
      {employees?.map(i => {
        if (i) return <Avatar key={i.id} employee={i} size="small" showTooltip />
        return null
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
