import React from 'react'
import { Employee } from '../../types'
import { Row, Col, Skeleton, Card, Typography, Avatar, Button } from 'antd'
import styled from 'styled-components'

const { Text, Title } = Typography

interface Props {
  loading: boolean
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
    | 'phoneNumber'
  >
}

const Description = styled.div`
  display: flex;
  flex-direction: column;
`

export default function EmployeeView({ loading, employee }: Props) {
  if (!loading && !employee) return <div>Employee info is not provided</div>
  return (
    <Skeleton loading={loading} avatar active>
      {employee && (
        <Row>
          <Col md={24} lg={14}>
            <Card.Meta
              title={
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Title level={4}>{employee.name}</Title>
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                      window.open('http://timemaster.sidenis.com', '_blank')
                    }}
                  >
                    Timemaster
                  </Button>
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
                  <Text>Bonus: {employee.bonuses} ₽</Text>
                </Description>
              }
              avatar={<Avatar size={150} shape="square" icon="user" src={employee.avatar} />}
            />
          </Col>
          <Col md={24} lg={10}>
            Right
          </Col>
        </Row>
      )}
    </Skeleton>
  )
}
