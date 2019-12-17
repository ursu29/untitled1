import React from 'react'
import { Project } from '../../types'
import { Row, Col, Skeleton, Card, Typography, Avatar, Button, Icon, Badge } from 'antd'
import styled from 'styled-components'
import PageContent from './PageContent'
import teamsIcon from '../../icons/teams'
import outlookIcon from '../../icons/outlook'

const { Text, Title } = Typography

interface Props {
  loading: boolean
  project?: Pick<Project, 'id' | 'name' | 'code' | 'description'>
  managers?: any
}

export default function EmployeeView({ loading, project, managers }: Props) {
  if (!loading && !project) return <div>Project info is not provided</div>
  return (
    <PageContent>
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
    </PageContent>
  )
}
