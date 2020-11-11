import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'
import { Skill } from '../../types'
import { getSkillLink } from '../../paths'

const StyledSkill = styled(Link)`
  color: #8d96ac;
  cursor: pointer;
  padding-right: 4px;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

type Props = {
  skill: Pick<Skill, 'id' | 'name'>
}

export const SkillLink = ({ skill }: Props) => (
  <StyledSkill to={getSkillLink(skill.id)}>#{skill.name}</StyledSkill>
)
