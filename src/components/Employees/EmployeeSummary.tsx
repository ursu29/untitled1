import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Tag } from 'antd'
import styled from 'styled-components'
import { getHobbyLink } from '../../paths'
import { useGetEmployeeHobbiesQuery } from '../../queries/hobbies'
import { Employee } from '../../types/graphql'
import Skeleton from '../UI/Skeleton'

const HobbyItem = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  padding-right: 4px;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

type Props = {
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeSummary({ employee }: Props) {
  const id = employee?.id || ''

  const { data, loading } = useGetEmployeeHobbiesQuery({
    variables: { id },
    skip: !id,
  })

  if (!employee) return null

  const hobbies = data?.employee?.hobbies || []

  return (
    <Skeleton loading={loading} active>
      <Row gutter={16}>
        <Col md={12}>
          <Typography.Title level={4}>About</Typography.Title>
          <Typography.Paragraph>Description</Typography.Paragraph>
        </Col>

        {hobbies.length > 0 && (
          <Col span={24} md={12}>
            <Typography.Title level={4}>Hobbies</Typography.Title>
            <div>
              {hobbies.map(hobby => (
                <Tag key={hobby.id}>
                  <HobbyItem to={getHobbyLink(hobby.id)}>{hobby.name}</HobbyItem>
                </Tag>
              ))}
            </div>
          </Col>
        )}
      </Row>
    </Skeleton>
  )
}
