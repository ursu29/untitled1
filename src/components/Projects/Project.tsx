import { Col, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'
import ProjectManagers from './ProjectManagers'

interface Props {
  loading: boolean
  project?: Pick<Project, 'id' | 'name' | 'code' | 'description'>
}

export default function EmployeeView({ loading, project }: Props) {
  if (!loading && !project) return <div>Project info is not provided</div>
  return (
    <Skeleton loading={loading} avatar active>
      {project && (
        <Row gutter={24}>
          <Col md={24} lg={14} style={{ marginBottom: 20 }}>
            <Typography.Paragraph>{project.description}</Typography.Paragraph>
          </Col>
          <Col md={24} lg={10}>
            <ProjectManagers project={{ id: project.id }} />
          </Col>
        </Row>
      )}
    </Skeleton>
  )
}
