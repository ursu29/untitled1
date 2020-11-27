import React from 'react'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { EmployeeDetails } from '../../fragments'
import { getEmployeeLink } from '../../paths'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'

export interface Props {
  employee: EmployeeDetails
  noLink?: boolean
  cardProps?: CardProps
}

function EmployeeCard({ employee, noLink, cardProps }: Props) {
  const CardInner = () => (
    <Card size={'small'} style={{ cursor: 'pointer', marginBottom: 4 }} {...cardProps}>
      <Card.Meta
        avatar={<Avatar size={50} employee={employee} />}
        title={employee.name}
        description={employee.position}
      />
    </Card>
  )

  return noLink ? (
    <CardInner />
  ) : (
    <Link to={getEmployeeLink(employee.email)}>
      <CardInner />
    </Link>
  )
}

export default EmployeeCard
