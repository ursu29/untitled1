import { Avatar, Card, Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'
import ProjectTag from './ProjectTag'

const { Title } = Typography

type ProjectPick = Pick<Project, 'id' | 'code' | 'name'>

interface Props {
  loading?: boolean
  title?: string
  small?: boolean
  projects?: ProjectPick[]
  leadingProjects?: ProjectPick[]
}

export default function ProjectTagList({
  loading,
  title,
  small,
  projects,
  leadingProjects,
}: Props) {
  // if (!loading && !projects) return null
  return (
    <div style={{ marginBottom: 16 }}>
      <Skeleton
        loading={loading}
        active
        paragraph={{
          rows: 1,
        }}
      >
        {projects &&
          (projects?.length ? (
            projects.map(project => {
              const leading = leadingProjects?.find(i => i.id === project.id)
              return (
                <ProjectTag
                  small={small}
                  key={project.id}
                  project={project}
                  leading={Boolean(leading)}
                />
              )
            })
          ) : (
            <div>No projects</div>
          ))}
      </Skeleton>
    </div>
  )
}
