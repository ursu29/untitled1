import React from 'react'
import { Tag, Typography } from 'antd'
import { Project } from '../../types'
import { Link } from 'react-router-dom'
import { getProjectLink } from '../../paths'
import { COLLAPSE_WIDTH } from '../../config'
import { useMediaQuery } from 'react-responsive'

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
  const color = codeStarts ? COLORS[codeStarts] : COLORS.is
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return (
    <span style={{ marginBottom: 8, display: 'inline-block' }}>
      <Link to={getProjectLink(project.code)}>
        <Tag
          key={project.id}
          color={color}
          style={{
            cursor: 'pointer',
            borderRadius: 2,
            fontSize: isLarge ? 20 : 14,
            lineHeight: isLarge ? '28px' : '22px',
            padding: isLarge ? '6px 20px' : '4px 8px',
            marginRight: 16,
          }}
        >
          <div
            style={{
              maxWidth: isLarge ? 'unset' : 200,
              overflow: isLarge ? 'unset' : 'hidden',
              textOverflow: isLarge ? 'unset' : 'ellipsis',
            }}
          >
            {project.name}
          </div>
        </Tag>
      </Link>
      <div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {project.code}
        </Text>
      </div>
    </span>
  )
}
