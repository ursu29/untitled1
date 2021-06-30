import { Typography } from 'antd'
import React from 'react'
import { Skill } from '../../types/graphql'
import SkillsCollapsed from '../UI/SkillsCollapsed'
import AboutTooltip from '../UI/AboutTooltip'

const { Title } = Typography

type SkillPick = Pick<Skill, 'id' | 'name' | 'description'>

type Props = {
  skills?: SkillPick[] | null
}

const EmployeeCVSkills = ({ skills }: Props) => {
  return (
    <>
      <Title level={5}>
        <AboutTooltip title="Generated according Confident In and Experienced skills in your profile">
          Skills
        </AboutTooltip>
      </Title>
      <SkillsCollapsed skills={skills || []} amount={15} />
    </>
  )
}

export default EmployeeCVSkills
