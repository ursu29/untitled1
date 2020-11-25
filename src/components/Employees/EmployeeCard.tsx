import { useQuery } from '@apollo/react-hooks'
import { Card, Skeleton } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import getEmployee, { QueryType } from '../../queries/getEmployee'
import { Employee } from '../../types'
import Avatar from '../Avatar'

interface Props {
  email: string
  employee?: Pick<Employee, 'id' | 'name' | 'email' | 'position'>
}

export default function EmployeeCard(props: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployee, {
    variables: { email: props.email },
    skip: Boolean(props.employee),
  })

  const employee = props.employee || data?.employeeByEmail

  return (
    <div style={{ marginBottom: 8 }}>
      <Skeleton loading={loading} active avatar paragraph={false}>
        {employee && (
          <Link to={getEmployeeLink(employee.email)} data-cy="employee_email">
            <Card hoverable bordered={true} bodyStyle={{ padding: 10, paddingRight: 16 }}>
              <Card.Meta
                title={employee.name}
                description={employee.position}
                avatar={<Avatar size={55} shape="circle" employee={employee} />}
              />
            </Card>
          </Link>
        )}
      </Skeleton>
    </div>
  )
}
