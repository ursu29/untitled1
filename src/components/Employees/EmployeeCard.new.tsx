import React from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import { EmployeeDetails } from '../../fragments'

type EmployeePick = EmployeeDetails & {
  avatar: string
}

export interface Props {
  employee: EmployeePick
  size?: 'small' | 'default' | 'large'
  onClick: (employee: EmployeePick) => void
}

function EmployeeCard({ employee, onClick, size = 'default' }: Props) {
  if (size === 'small') {
    return (
      <Tooltip placement="topLeft" title={employee.name + ' | ' + employee.position}>
        <Avatar style={{ cursor: 'pointer' }} size={40} src={employee.avatar} alt={employee.name} />
      </Tooltip>
    )
  }

  return (
    <Card
      size={size === 'large' ? 'default' : 'small'}
      style={{ cursor: 'pointer', marginBottom: 4 }}
      bordered={false}
      hoverable
      cover={size === 'large' && <img alt="example" src={employee.avatar} />}
      onClick={() => {
        onClick(employee)
      }}
    >
      <Card.Meta
        avatar={size !== 'large' && <Avatar size={50} src={employee.avatar} alt={employee.name} />}
        title={employee.name}
        description={employee.position}
      />
    </Card>
  )
}

export default EmployeeCard
