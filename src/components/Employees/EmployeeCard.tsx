import { Card, Skeleton } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { GetEmployeeQuery } from '../../queries/employees'
import Avatar from '../Avatar'
import './EmployeeCard.css'
import { useGetEmployeeQuery } from '../../queries/employees'

export interface Props {
  email: string
  employee?: GetEmployeeQuery['employeeByEmail']
  noLink?: boolean
  cardProps?: React.ComponentProps<typeof Card>
}

export default function EmployeeCard({ email, employee: employeeProp, noLink, cardProps }: Props) {
  const { data, loading, error } = useGetEmployeeQuery({
    variables: { email },
    skip: Boolean(employeeProp),
  })

  const employee = data?.employeeByEmail || employeeProp

  if (!employee) return null

  if (loading) {
    return <Skeleton avatar paragraph={false} active />
  }

  if (error) {
    return <div>Error during loading :(</div>
  }

  return (
    <Card
      {...cardProps}
      bordered={false}
      bodyStyle={{ padding: 0, margin: 0 }}
      className="employee-card"
    >
      <Card.Meta
        avatar={<Avatar size={40} employee={employee} />}
        title={
          noLink ? (
            employee.name
          ) : (
            <Link data-cy="employee_email" to={getEmployeeLink(employee.email)}>
              {employee.name}
            </Link>
          )
        }
        description={employee.position}
      />
    </Card>
  )
}
