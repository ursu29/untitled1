import React from 'react'
import { Card, Avatar } from 'antd'
import { EmployeeDetails } from '../../fragments'
import { getEmployeeLink } from '../../paths'
import { Link } from 'react-router-dom'

type EmployeePick = EmployeeDetails & {
  avatar: string
}

export interface Props {
  employee: EmployeePick
}

function EmployeeCard({ employee }: Props) {
  return (
    <Link to={getEmployeeLink(employee.email)}>
      <Card
        size={'small'}
        style={{ cursor: 'pointer', marginBottom: 4 }}
        bordered={false}
        hoverable
      >
        <Card.Meta
          avatar={<Avatar size={50} src={employee.avatar} alt={employee.name} />}
          title={employee.name}
          description={employee.position}
        />
      </Card>
    </Link>
  )
}

export default EmployeeCard
