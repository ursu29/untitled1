import { Col, Row, Skeleton, Tag, Typography } from 'antd'
import React from 'react'
import { Employee, Project, Skill } from '../../types'
import EmployeeLink from '../Employees/EmployeeLink'

const { Text, Title, Paragraph } = Typography

type SkillPick = {
  id: Skill['id']
  name: Skill['name']
  description: Skill['description']
  isMatrixOnly: Skill['isMatrixOnly']
  parent: Pick<SkillPick, 'id' | 'name'>
  projects: Pick<Project, 'id' | 'name' | 'code'>
  addedBy: Pick<Employee, 'id' | 'name' | 'email'>
}

interface Props {
  loading: boolean
  skill?: SkillPick
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
