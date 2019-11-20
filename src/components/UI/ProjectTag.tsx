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
    <Tag key={project.id} color="blue">
      <Link to={getProjectLink(project.code)}>{project.name}</Link>
    </Tag>
  )
}
