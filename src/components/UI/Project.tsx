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
}

export default function EmployeeView({ loading, project }: Props) {
  if (!loading && !project) return <div>Project info is not provided</div>
  return (
    <PageContent>
      <Skeleton loading={loading} avatar active>
        {project && (
          <>
            <Title>{project.name}</Title>
            <Typography.Paragraph>{project.description}</Typography.Paragraph>
          </>
        )}
      </Skeleton>
    </PageContent>
  )
}
