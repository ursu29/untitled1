import React from 'react'
import { Typography, Row, Col, Card } from 'antd'
import styled from 'styled-components'
import { useGetEmployeeSummaryQuery } from '../../queries/employeeSummary'
import { Employee } from '../../types/graphql'
import Skeleton from '../UI/Skeleton'
import HobbyTag from '../Hobbies/HobbyTag'
import { AboutForm, HobbiesForm } from './EmployeeSummaryForms'

const HobbyRow = styled(Row)`
  margin-top: 8px;
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
              hobbies.map(hobby => <HobbyTag key={hobby.id} hobby={hobby} />)
            ) : (
              <HobbyEmpty>Employee has no hobbies</HobbyEmpty>
            )}
          </Card>
        </Col>
      </HobbyRow>
    </Skeleton>
  )
}
