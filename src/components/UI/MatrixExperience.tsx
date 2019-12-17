import React, { useState } from 'react'
import { MatrixCell } from './Matrix'
import { Tooltip } from 'antd'
import { Skill, Experience } from '../../types'

interface Props {
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  experience?: Experience
  matrixLevelSelect: any
}

export default function MatrixExperience({ skill, experience, matrixLevelSelect }: Props) {
  const [visible, toggleVisibility] = useState(false)
  let backgroundColor = '#f9f9f9'
  if (experience) {
    if (experience.level.index === 1) backgroundColor = '#efefb4'
    if (experience.level.index > 1) backgroundColor = '#bbeabb'
  }
  return (
    <Tooltip title={skill.description} placement="left">
      <div
        style={{ backgroundColor, width: '100%', position: 'relative' }}
        onMouseOver={() => toggleVisibility(true)}
        onMouseLeave={() => toggleVisibility(false)}
      >
        <div
          style={{
            display: visible ? 'block' : 'none',
            position: 'absolute',
            right: 0,
            paddingTop: 5,
            transform: 'translateY(-100%)',
          }}
        >
          {matrixLevelSelect}
        </div>
        <MatrixCell style={{ border: visible ? '2px solid #cbcfd2' : '2px solid transparent' }}>
          {skill.name}
        </MatrixCell>
      </div>
    </Tooltip>
  )
}
