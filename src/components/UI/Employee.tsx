import { Avatar, Badge, Button, Card, Col, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import outlook from '../../svg/outlook.svg'
import teams from '../../svg/teams.svg'
import { Employee } from '../../types'
import PageContent from './PageContent'

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
  manager?: any
  projects?: any
}

const Description = styled.div`
  display: flex;
  flex-direction: column;
`

export default function EmployeeView({ loading, employee, manager, projects, mobile }: Props) {
  if (!loading && !employee) return <div>Employee info is not provided</div>
  return (
    <PageContent>
      <Skeleton loading={loading} avatar active>
        {employee && (
          <Row>
            <Col md={24} lg={14} style={{ marginBottom: 20 }}>
              <Card bordered={false} bodyStyle={{ padding: 0, marginBottom: 20 }}>
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <Title level={4} style={{ paddingRight: 8 }}>
                        {employee.name}
                      </Title>
                      {employee.isMe && (
                        <Button
                          onClick={() => {
                            window.open('http://timemaster.sidenis.com', '_blank')
                          }}
                        >
                          Timemaster
                        </Button>
                      )}
                    </div>
                  }
                  description={
                    <Description>
                      <Text>{employee.position}</Text>
                      <Text>
                        {employee.country} / {employee.location}
                      </Text>
                      <Text>{employee.email}</Text>
                      <Text>{employee.phoneNumber}</Text>
                      {employee.isMe && employee.bonuses && (
                        <Text>Bonus: {employee.bonuses} ₽</Text>
                      )}
                    </Description>
                  }
                  avatar={
                    <Avatar
                      size={mobile ? 60 : 150}
                      shape="square"
                      icon="user"
                      src={employee?.avatar}
                    />
                  }
                />
              </Card>
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
                  href={`https://projects.microsoft.com/l/chat/0/0?users=${employee.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ paddingRight: 8 }}
                >
                  <Button shape="circle-outline">
                    <img src={teams} alt="teams" />
                  </Button>
                </a>{' '}
                <Badge
                  color={employee.status === 'Available' ? 'green' : 'red'}
                  text={employee.status}
                />
              </div>
            </Col>
            <Col md={24} lg={10}>
              {manager}
              {projects}
            </Col>
          </Row>
        )}
      </Skeleton>
    </PageContent>
  )
}
