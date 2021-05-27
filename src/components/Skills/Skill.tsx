import { Col, Row, Skeleton, Tag, Typography } from 'antd'
import React from 'react'
import { GetSkillsDetailedQuery } from '../../queries/skills'
import { ArrayElement } from '../../utils/types'
import EmployeeLink from '../Employees/EmployeeLink'
import Helmet from '../Helmet'

const { Text, Title, Paragraph } = Typography

interface Props {
  loading: boolean
  skill?: ArrayElement<GetSkillsDetailedQuery['skills']>
  projects?: any
  experience?: any
  editComponent: React.ReactNode
}

export default function Skill({ loading, skill, projects, experience, editComponent }: Props) {
  return (
    <Skeleton loading={loading} active>
      {skill && (
        <div>
          <Helmet title={skill.name} />
          <Row>
            <Col md={24} lg={14} style={{ marginBottom: 20 }}>
              <Title level={1} data-cy="skillName">
                {skill.name} {editComponent}
              </Title>
              <Paragraph data-cy="description">{skill.description}</Paragraph>
              {skill.isMatrixOnly && (
                <Paragraph>
                  <Tag color="volcano">Matrix only</Tag>
                </Paragraph>
              )}
              <div data-cy="author">
                <Text>Added by </Text>
                <EmployeeLink employee={skill.addedBy} />
              </div>
            </Col>
            <Col md={24} lg={10}>
              {projects}
              {experience}
            </Col>
          </Row>
        </div>
      )}
    </Skeleton>
  )
}
