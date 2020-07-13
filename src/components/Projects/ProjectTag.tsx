import React from 'react'
import { CrownOutlined } from '@ant-design/icons'
import { Tag, Typography, Tooltip } from 'antd'
import { Project } from '../../types'
import { Link } from 'react-router-dom'
import { getProjectLink } from '../../paths'
import { COLLAPSE_WIDTH } from '../../config'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography

interface Props {
  small?: boolean
  leading?: boolean
  project: Pick<Project, 'id' | 'name' | 'code'>
}

const COLORS: any = {
  is: '#2F80ED',
  guild: '#27AE60',
  az: '#F2994A',
  sr: '#8C94AF',
}

export default function ProjectTag({ project, small = false, leading }: Props) {
  const codeStarts = project.code.split('-')[0]?.toLowerCase()
  const color = codeStarts ? COLORS[codeStarts] : COLORS.is
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH }) && !small
  return (
    <span style={{ marginBottom: 8, display: 'inline-block' }}>
      <Link to={getProjectLink(project.code)}>
        <Tag
          key={project.id}
          color={color}
          style={{
            cursor: 'pointer',
            borderRadius: 2,
            fontSize: isLarge ? 18 : 14,
            lineHeight: isLarge ? '24px' : '20px',
            padding: isLarge ? '5px 20px' : '4px 10px',
            marginRight: isLarge ? 16 : 10,
            userSelect: 'none',
          }}
        >
          <div
            style={{
              maxWidth: isLarge ? 'unset' : 230,
              overflow: isLarge ? 'unset' : 'hidden',
              textOverflow: isLarge ? 'unset' : 'ellipsis',
            }}
          >
            {leading && (
              <>
                <Tooltip placement="top" title="Manager">
                  <CrownOutlined />
                </Tooltip>
                &nbsp;
              </>
            )}
            {project.name}
          </div>
        </Tag>
      </Link>
      {isLarge && (
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {project.code}
          </Text>
        </div>
      )}
    </span>
  )
}
