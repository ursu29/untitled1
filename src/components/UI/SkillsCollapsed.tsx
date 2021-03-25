import React, { useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import SkillTag from '../Skills/SkillTag'
import { Skill } from '../../types/graphql'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  min-height: 35px;
  align-items: center;
`

const Empty = styled.div`
  color: rgba(0, 0, 0, 0.65);
  align-self: center;
`

const ToggleButton = styled(Button)`
  color: rgba(0, 0, 0, 0.65);
  align-self: center;
`

type Props = {
  skills: Pick<Skill, 'id' | 'name' | 'description'>[]
  amount: number
  emptyString?: string
}

const SkillsCollapsed = ({ skills, amount, emptyString }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const list = amount && !showMore ? skills.slice(0, amount) : skills
  const total = skills.length

  return (
    <Wrapper>
      {list.map(skill => (
        <SkillTag key={skill.id} skill={skill} style={{ cursor: 'pointer' }} />
      ))}
      {total > amount && (
        <ToggleButton
          key={showMore ? 'less' : 'more'}
          type="link"
          size="small"
          onClick={() => setShowMore(prev => !prev)}
        >
          {showMore ? <>Show less</> : <>+ {total - amount} more</>}
        </ToggleButton>
      )}
      {!total && <Empty>{emptyString || '(not assigned yet)'}</Empty>}
    </Wrapper>
  )
}

export default SkillsCollapsed
