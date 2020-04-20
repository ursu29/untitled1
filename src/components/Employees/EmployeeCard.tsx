import { Avatar, Card, Skeleton } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee } from '../../types'

interface Props {
  loading?: boolean
  employee?: Pick<Employee, 'name' | 'email' | 'position' | 'avatar'>
}

export default function EmployeeCard({ loading, employee }: Props) {
  if (!loading && !employee) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <Skeleton loading={loading} active avatar paragraph={false}>
        {employee && (
          <Link to={getEmployeeLink(employee.email)}>
            <Card hoverable bordered={true} bodyStyle={{ padding: 10 }}>
              <Card.Meta
                title={employee.name}
                description={employee.position}
                avatar={
                  <Avatar
                    size={55}
                    shape="circle"
                    icon="user"
                    src={employee.avatar}
                    alt={employee.name}
                  />
                }
              />
            </Card>
          </Link>
        )}
      </Skeleton>
    </div>
  )
}
