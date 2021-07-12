import { Button, Col, Row, Space, Tag, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { GetEmployeeDetailedQuery } from '../../queries/employees'
import getLocationName from '../../utils/getLocationName'
import Avatar from '../Avatar'
import EmployeeManager from './EmployeeManager'
import EmployeeProjects from './EmployeeProjects'
import UpdateEmployee from './UpdateEmployee'

interface Props {
  employee: GetEmployeeDetailedQuery['employeeByEmail']
}

export default function Employee({ employee }: Props) {
  if (!employee) return <Typography.Text>Employee is not found</Typography.Text>

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <Space align="start" size="middle">
            <Avatar employee={employee} size={168} shape="circle" highResolution />
            <Space direction="vertical" style={{ display: 'block' }}>
              <Typography.Title data-cy="employee_name" level={4} style={{ marginBottom: 0 }}>
                {employee.name}
                <UpdateEmployee employee={employee} />
              </Typography.Title>
              <Typography.Text data-cy="position" type="secondary">
                {employee.position}
              </Typography.Text>
              <Space direction="vertical" style={{ display: 'block', margin: '8px 0' }}>
                {employee.location && (
                  <Typography.Text data-cy="location" style={{ color: '#595959' }}>
                    {getLocationName(employee.location)}
                  </Typography.Text>
                )}
                <Typography.Link
                  data-cy="email"
                  style={{ color: '#595959' }}
                  href={`mailto:${employee.email}`}
                >
                  {employee.email}
                </Typography.Link>
                <Typography.Link
                  data-cy="phone"
                  style={{ color: '#595959' }}
                  href={`tel:${employee.phoneNumber}`}
                >
                  {employee.phoneNumber}
                </Typography.Link>
              </Space>
              {employee.bonuses && <Tag data-cy="bonuses">Bonus: {employee.bonuses} ₽</Tag>}
            </Space>
          </Space>
        </Col>
        {employee.agileManager && (
          <Col xs={24} md={12} lg={{ span: 6, offset: employee.agileManager ? 0 : 6 }}>
            <EmployeeManager employee={employee} />
          </Col>
        )}
        {employee.isMe && (
          <Col xs={24} md={6} lg={6}>
            <Space direction="vertical">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Tools
              </Typography.Title>
              <Link data-cy="office_planner" to="/office-planner">
                <Button>️‍🔥 Office Planner</Button>
              </Link>
              <Link data-cy="workspace_planner" to="/workspace-planner">
                <Button>️‍🔥 Workspace Planner</Button>
              </Link>
              <Link data-cy="timemaster" to="/timemaster">
                <Button>Timemaster</Button>
              </Link>
            </Space>
          </Col>
        )}
        {/* <Col xs={24} md={12} lg={12}>
          <AntAvatar size={40} shape="square" style={{ opacity: 0.7 }}>
            <Tooltip placement="right" title="No trophies yet">
              <TrophyOutlined />
            </Tooltip>
          </AntAvatar>
        </Col> */}
        <Col
          xs={24}
          md={!employee.agileManager && !employee.isMe ? 12 : 18}
          lg={!employee.agileManager && !employee.isMe ? 12 : 18}
        >
          <EmployeeProjects employee={employee} />
        </Col>
      </Row>
    </>
  )
}
