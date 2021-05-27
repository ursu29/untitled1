import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Tag, Card } from 'antd'
import styled from 'styled-components'
import { getHobbyLink } from '../../paths'
import { useGetEmployeeSummaryQuery } from '../../queries/employeeSummary'
import { Employee } from '../../types/graphql'
import Skeleton from '../UI/Skeleton'
import { AboutForm, HobbiesForm } from './EmployeeSummaryForms'

const HobbyRow = styled(Row)`
  margin-top: 8px;
`

const HobbyTag = styled(Tag)`
  margin-right: 8px;
  margin-bottom: 8px;
`

const HobbyItem = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

const HobbyEmpty = styled(Typography.Paragraph)`
  color: gray;
  font-style: italic;
`

type Props = {
  employee?: Pick<Employee, 'id'>
  editable?: boolean
}

export default function EmployeeSummary({ employee, editable }: Props) {
  const id = employee?.id || ''

  const { data, loading } = useGetEmployeeSummaryQuery({
    variables: { id },
    skip: !id,
  })

  if (!employee) return null

  const hobbies = data?.employee?.hobbies || []
  const about = data?.employee?.about || ''

  return (
    <Skeleton loading={loading} active>
      <HobbyRow gutter={16}>
        <Col span={24} md={12}>
          <Typography.Title level={4}>About</Typography.Title>
          {editable ? (
            <AboutForm employeeId={id} about={about} />
          ) : (
            <Typography.Text>{about}</Typography.Text>
          )}
        </Col>

        <Col span={24} md={12}>
          <Card>
            <Typography.Title level={5}>Hobbies</Typography.Title>
            {editable ? (
              <HobbiesForm employeeId={id} hobbies={hobbies} />
            ) : hobbies.length > 0 ? (
              hobbies.map(hobby => (
                <HobbyTag key={hobby.id}>
                  <HobbyItem to={getHobbyLink(hobby.id)}>{hobby.name}</HobbyItem>
                </HobbyTag>
              ))
            ) : (
              <HobbyEmpty>Employee has no hobbies</HobbyEmpty>
            )}
          </Card>
        </Col>
      </HobbyRow>
    </Skeleton>
  )
}
