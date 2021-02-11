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
  style?: React.CSSProperties
}

const COLORS: any = {
  is: '#2F80ED',
  guild: '#27AE60',
  az: '#F2994A',
  sr: '#8C94AF',
}

const SWISSRE_PREFIX = 'swissre '

export default function ProjectTag({ project, small = false, leading, style = {} }: Props) {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH }) && !small
  if (!project) return null

  const codeStarts = project.code.split('-')[0]?.toLowerCase()
  const color = codeStarts ? COLORS[codeStarts] : COLORS.is
  const name = project.name.toLowerCase().startsWith(SWISSRE_PREFIX)
    ? project.name.substring(SWISSRE_PREFIX.length)
    : project.name
  return (
    <span>
      <Link to={getProjectLink(project.code)}>
        <Tag
          title={project.name}
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
            maxWidth: '100%',
            ...style,
          }}
        >
          <div
            style={{
              maxWidth: isLarge ? 'unset' : 180,
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
            {name}
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
