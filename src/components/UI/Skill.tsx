import React from 'react'
import { Skill, Project, Employee } from '../../types'
import PageContent from './PageContent'
import { Skeleton, Typography, Tag } from 'antd'
import EmployeeLink from './EmployeeLink'

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
  editComponent: React.ReactNode
}

export default ({ loading, skill, editComponent }: Props) => {
  return (
    <PageContent>
      <Skeleton loading={loading} active>
        {skill && (
          <div>
            {editComponent}
            <Title level={1}>{skill.name}</Title>
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
          </div>
        )}
      </Skeleton>
    </PageContent>
  )
}
