import React from 'react'
import { Tag } from 'antd'
import { Project } from '../../types'
import { Link } from 'react-router-dom'
import { getProjectLink } from '../../paths'

interface Props {
  project: Pick<Project, 'id' | 'name' | 'code'>
}

export default function ProjectTag({ project }: Props) {
  return (
    <span style={{ marginBottom: 8, display: 'inline-block' }}>
      <Link to={getProjectLink(project.code)}>
        <Tag key={project.id} color="blue" style={{ cursor: 'pointer' }}>
          {project.name}
        </Tag>
      </Link>
    </span>
  )
}
