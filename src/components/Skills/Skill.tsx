import { Col, Row, Skeleton, Tag, Typography } from 'antd'
import React from 'react'
import { GetSkillsDetailedQuery } from '../../queries/skills'
import { ArrayElement } from '../../utils/types'
import EmployeeLink from '../Employees/EmployeeLink'

const { Text, Title, Paragraph } = Typography

interface Props {
  loading: boolean
  skill?: ArrayElement<GetSkillsDetailedQuery['skills']>
  projects?: any
  experience?: any
  editComponent: React.ReactNode
}

export default ({ loading, skill, projects, experience, editComponent }: Props) => {
  return (
    <Skeleton loading={loading} active>
      {skill && (
        <div>
          <Row>
            <Col md={24} lg={14} style={{ marginBottom: 20 }}>
              <Title level={1}>
                {skill.name} {editComponent}
              </Title>
              <Paragraph>{skill.description}</Paragraph>
              {skill.isMatrixOnly && (
                <Paragraph>
                  <Tag color="volcano">Matrix only</Tag>
                </Paragraph>
              )}
              <div>
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
