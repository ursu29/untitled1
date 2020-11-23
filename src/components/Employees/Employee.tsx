import { Badge, Button, Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLLAPSE_WIDTH } from '../../config'
import { EmployeeDetails } from '../../fragments'
import PATHS from '../../paths'
import { ReactComponent as OutlookIcon } from '../../svg/outlook.svg'
import { ReactComponent as TeamsIcon } from '../../svg/teams.svg'
import { Employee } from '../../types'
import Avatar from '../Avatar'
import EmployeeManager from './EmployeeManager'
import EmployeeProjects from './EmployeeProjects'
import UpdateEmployee from './UpdateEmployee'

const { Text, Title } = Typography

const Description = styled.div`
  display: flex;
  flex-direction: column;
`

type EmployeePick = EmployeeDetails & {
  status: Employee['status']
  bonuses: Employee['bonuses']
  agileManager: EmployeeDetails | null
}

interface Props {
  employee: EmployeePick
}

export default function ({ employee }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const mobile = !isLarge

  const employeeDetails = (
    <>
      <Text data-cy="email">{employee.email}</Text>
      <Text data-cy="phone">{employee.phoneNumber}</Text>
      {employee.isMe && employee.bonuses ? (
        <Text data-cy="bonuses">Bonus: {employee.bonuses} ₽</Text>
      ) : null}
    </>
  )

  return (
    <Row>
      <Col md={24} lg={14} style={{ marginBottom: 20 }}>
        <Card bordered={false} bodyStyle={{ padding: 0, marginBottom: 20 }}>
          <Card.Meta
            title={
              <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <Title
                  level={4}
                  style={{ paddingRight: 8, whiteSpace: 'normal' }}
                  data-cy="employee_name"
                >
                  {employee.name}
                  <UpdateEmployee employee={employee} />
                </Title>
                {employee.isMe && !mobile && (
                  <Link to={PATHS.TIMEMASTER} data-cy="timemaster">
                    <Button>Timemaster</Button>
                  </Link>
                )}
              </div>
            }
            description={
              <Description>
                <Text data-cy="position">{employee.position}</Text>
                <Text data-cy="location">{employee.location}</Text>
                {!mobile && employeeDetails}
              </Description>
            }
            avatar={
              <Avatar employee={employee} size={mobile ? 135 : 150} shape="square" highResolution />
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
            <Button
              data-cy="mail_button"
              shape="circle"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <OutlookIcon />
            </Button>
          </a>
          <a
            href={`https://teams.microsoft.com/l/chat/0/0?users=${employee.email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ paddingRight: 8 }}
          >
            <Button
              data-cy="teams_button"
              shape="circle"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TeamsIcon />
            </Button>
          </a>{' '}
          <Badge
            data-cy="status"
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
        <EmployeeManager employee={employee.agileManager} />
        <EmployeeProjects employee={employee} />
      </Col>
    </Row>
  )
}
