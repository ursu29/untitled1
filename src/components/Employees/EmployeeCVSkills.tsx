import { Typography } from 'antd'
import React from 'react'
import { Experience, Skill } from '../../types/graphql'
import SkillsCollapsed from '../UI/SkillsCollapsed'
import AboutTooltip from '../UI/AboutTooltip'

const { Title } = Typography

type SkillPick = Pick<Skill, 'id' | 'name' | 'description'>
type ExperiencePick = Pick<Experience, 'id' | 'level'> & { skill: SkillPick }

type Props = {
  experiences?: ExperiencePick[] | null
}

const EmployeeCVSkills = ({ experiences }: Props) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        <AboutTooltip title="Generated according Confident In and Experienced skills in your profile">
          Skills
        </AboutTooltip>
      </Title>
      <SkillsCollapsed experiences={experiences || []} amount={15} />
    </div>
  )
}

export default EmployeeCVSkills
