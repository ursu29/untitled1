import React, { PropsWithChildren, ReactNode } from 'react'
import { Card, Avatar, Tooltip, Icon } from 'antd'
import { Employee } from '../../types'

interface Props extends PropsWithChildren<any> {
  title: string
  status: 'pending' | 'active' | 'done'
  employees: Pick<Employee, 'id' | 'name' | 'email' | 'avatar'>[] | null
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
          <Tooltip key={i.id} placement="top" title={i.name}>
            <Avatar src={i.avatar} shape="circle" size="small" />
          </Tooltip>
        )
      })}
    </div>
  )

  return (
    <Card
      size="small"
      title={
        <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
          <span>{statuses[status]}</span>
          {title}
        </div>
      }
      extra={extra}
      style={{ opacity: status === 'pending' ? 0.6 : 1 }}
      headStyle={{ borderBottom: 0, fontWeight: 'normal' }}
      bodyStyle={!Boolean(children) ? { padding: 0 } : undefined}
    >
      <div>{description}</div>
      {children}
    </Card>
  )
}

export default ActiveStepCard
