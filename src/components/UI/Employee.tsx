import React from 'react'
import { Employee } from '../../types'
import { Row, Col, Skeleton, Card, Typography, Avatar, Button, Icon, Badge } from 'antd'
import styled from 'styled-components'
import PageContent from './PageContent'
import teamsIcon from '../../icons/teams'
import outlookIcon from '../../icons/outlook'

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
  const avatar = <Avatar size={150} shape="square" icon="user" src={employee?.avatar} />
  return (
    <PageContent>
      <Skeleton loading={loading} avatar active>
        {employee && (
          <Row>
            <Col md={24} lg={14} style={{ marginBottom: 20 }}>
              {mobile && <div style={{ marginBottom: 16 }}>{avatar}</div>}
              <Card bordered={false} bodyStyle={{ padding: 0, marginBottom: 20 }}>
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <Title level={4}>{employee.name}</Title>
                      {employee.isMe && (
                        <Button
                          style={{ marginLeft: 8 }}
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
                      {employee.isMe && <Text>Bonus: {employee.bonuses} ₽</Text>}
                    </Description>
                  }
                  avatar={mobile ? undefined : avatar}
                />
              </Card>
              <div>
                <a
                  href={`https://outlook.office.com/owa/?path=/mail/action/compose&to=${employee.email}`}
                  target="_blank"
                >
                  <Button shape="circle-outline">
                    <Icon component={outlookIcon} />
                  </Button>
                </a>{' '}
                <a
                  href={`https://projects.microsoft.com/l/chat/0/0?users=${employee.email}`}
                  target="_blank"
                >
                  <Button shape="circle-outline">
                    <Icon component={teamsIcon} />
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
