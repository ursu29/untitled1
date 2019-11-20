import { Avatar, Card, Skeleton, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeLink } from '../../paths'
import { Employee } from '../../types'

const { Title } = Typography

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
          <>
            <Title level={4}>Manager</Title>
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <Card.Meta
                title={<Link to={getEmployeeLink(employee.email)}>{employee.name}</Link>}
                description={employee.position}
                avatar={<Avatar size={55} shape="circle" icon="user" src={employee.avatar} />}
              />
            </Card>
          </>
        )}
      </Skeleton>
    </div>
  )
}
