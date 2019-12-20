import { Col, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'

const { Title } = Typography

interface Props {
  loading: boolean
  project?: Pick<Project, 'id' | 'name' | 'code' | 'description'>
  managers?: any
}

export default function EmployeeView({ loading, project, managers }: Props) {
  if (!loading && !project) return <div>Project info is not provided</div>
  return (
    <Skeleton loading={loading} avatar active>
      {project && (
        <Row>
          <Col md={24} lg={14} style={{ marginBottom: 20 }}>
            <Title>{project.name}</Title>
            <Typography.Paragraph>{project.description}</Typography.Paragraph>
          </Col>
          <Col md={24} lg={10}>
            {managers}
          </Col>
        </Row>
      )}
    </Skeleton>
  )
}
