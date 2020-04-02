import { Avatar, Badge, Button, Card, Col, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import outlook from '../../svg/outlook.svg'
import teams from '../../svg/teams.svg'
import { Employee } from '../../types'
import EmployeeManager from './EmployeeManager'
import EmployeeProjects from './EmployeeProjects'
import { Link } from 'react-router-dom'
import PATHS from '../../paths'

const { Text, Title } = Typography

interface Props {
  loading: boolean
  mobile: boolean
  employee?: Pick<
    Employee,
    | 'id'
    | 'name'
    | 'position'
    | 'avatar'
    | 'bonuses'
    | 'country'
    | 'email'
    | 'isMe'
    | 'location'
    | 'status'
    | 'phoneNumber'
  >
}

const Description = styled.div`
  display: flex;
  flex-direction: column;
`

export default function EmployeeView({ loading, employee, mobile }: Props) {
  if (!loading && !employee) return <div>Employee info is not provided</div>

  const employeeDetails = employee && (
    <>
      <Text>{employee.email}</Text>
      <Text>{employee.phoneNumber}</Text>
      {employee.isMe && employee.bonuses && <Text>Bonus: {employee.bonuses} ₽</Text>}
    </>
  )

  return (
    <Skeleton loading={loading} avatar active>
      {employee && (
        <Row>
          <Col md={24} lg={14} style={{ marginBottom: 20 }}>
            <Card bordered={false} bodyStyle={{ padding: 0, marginBottom: 20 }}>
              <Card.Meta
                title={
                  <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <Title level={4} style={{ paddingRight: 8, whiteSpace: 'normal' }}>
                      {employee.name}
                    </Title>
                    {employee.isMe && !mobile && (
                      <Link to={PATHS.TIMEMASTER}>
                        <Button>Timemaster</Button>
                      </Link>
                    )}
                  </div>
                }
                description={
                  <Description>
                    <Text>{employee.position}</Text>
                    <Text>{employee.location}</Text>
                    {!mobile && employeeDetails}
                  </Description>
                }
                avatar={
                  <Avatar
                    size={mobile ? 135 : 150}
                    shape="square"
                    icon="user"
                    src={employee?.avatar}
                    alt={employee?.name}
                  />
                }
              />
            </Card>
            {mobile && <Description style={{ marginBottom: 10 }}>{employeeDetails}</Description>}
            <div>
              <a
                href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=${employee.email}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ paddingRight: 8 }}
              >
                <Button shape="circle-outline">
                  <img src={outlook} alt="outlook" />
                </Button>
              </a>
              <a
                href={`https://teams.microsoft.com/l/chat/0/0?users=${employee.email}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ paddingRight: 8 }}
              >
                <Button shape="circle-outline">
                  <img src={teams} alt="teams" />
                </Button>
              </a>{' '}
              <Badge
                color={
                  employee.status === 'Available'
                    ? 'green'
                    : employee.status === 'Unavailable'
                    ? 'gray'
                    : 'red'
                }
                text={employee.status}
              />
            </div>
          </Col>
          <Col md={24} lg={10}>
            <EmployeeManager employee={employee} />
            <EmployeeProjects employee={employee} />
          </Col>
        </Row>
      )}
    </Skeleton>
  )
}