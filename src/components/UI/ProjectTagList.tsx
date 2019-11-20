import { Avatar, Card, Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'
import ProjectCard from './ProjectTag'

const { Title } = Typography

type ProjectPick = Pick<Project, 'id' | 'code' | 'name'>

interface Props {
  loading?: boolean
  projects?: ProjectPick[]
  leadingProject?: ProjectPick[]
}

export default function ProjectTagList({ loading, projects }: Props) {
  if (!loading && !projects) return null
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
            <Title level={4}>Projects</Title>
            {projects.length ? (
              projects.map(project => <ProjectCard key={project.id} project={project} />)
            ) : (
              <div>No projects</div>
            )}
          </>
        )}
      </Skeleton>
    </div>
  )
}
