import React from 'react'
import { Card } from 'antd'
import { EmployeeDetails } from '../../fragments'
import { getEmployeeLink } from '../../paths'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'

export interface Props {
  employee: EmployeeDetails
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
          avatar={<Avatar size={50} employee={employee} />}
          title={employee.name}
          description={employee.position}
        />
      </Card>
    </Link>
  )
}

export default EmployeeCard
