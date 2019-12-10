import { Avatar, Card, Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'
import ProjectTag from './ProjectTag'

const { Title } = Typography

type ProjectPick = Pick<Project, 'id' | 'code' | 'name'>

interface Props {
  loading?: boolean
  title?: string
  projects?: ProjectPick[]
  leadingProject?: ProjectPick[]
}

export default function ProjectTagList({ loading, title, projects }: Props) {
  // if (!loading && !projects) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <Skeleton
        loading={loading}
        active
        paragraph={{
          rows: 1,
        }}
      >
        {projects && (
          <>
            <Title level={3} style={{ fontWeight: 'normal' }}>
              {title || 'Projects'}
            </Title>
            {projects?.length ? (
              projects.map(project => <ProjectTag key={project.id} project={project} />)
            ) : (
              <div>No projects</div>
            )}
          </>
        )}
      </Skeleton>
    </div>
  )
}
