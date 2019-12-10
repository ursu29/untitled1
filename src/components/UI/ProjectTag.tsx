import React from 'react'
import { Tag, Typography } from 'antd'
import { Project } from '../../types'
import { Link } from 'react-router-dom'
import { getProjectLink } from '../../paths'

const { Text } = Typography

interface Props {
  project: Pick<Project, 'id' | 'name' | 'code'>
}

const COLORS: any = {
  is: '#2F80ED',
  guild: '#27AE60',
  az: '#F2994A',
  sr: '#8C94AF',
}

export default function ProjectTag({ project }: Props) {
  const codeStarts = project.code.split('-')[0]?.toLowerCase()
  console.log('codeStarts', codeStarts)
  const color = codeStarts ? COLORS[codeStarts] : COLORS.is
  return (
    <span style={{ marginBottom: 8, display: 'inline-block' }}>
      <Link to={getProjectLink(project.code)}>
        <Tag
          key={project.id}
          color={color}
          style={{
            cursor: 'pointer',
            borderRadius: 2,
            fontSize: 20,
            lineHeight: '28px',
            padding: '6px 20px',
          }}
        >
          {project.name}
        </Tag>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {project.code}
          </Text>
        </div>
      </Link>
    </span>
  )
}
