import { Skeleton, Typography } from 'antd'
import React from 'react'
import { Project } from '../../types'
import PageContent from './PageContent'
import ProjectTagList from './ProjectTagList'

const { Title } = Typography

interface ProjectGroupProps {
  title: string
  code: string
  projects: Props['projects']
}

const ProjectGroup = ({ title, projects, code }: ProjectGroupProps) => {
  const projectsFiltered = projects?.filter(project =>
    project.code.toLowerCase().startsWith(code.toLowerCase()),
  )

  if (!projectsFiltered) return null

  return <ProjectTagList projects={projectsFiltered} title={title} />
}

interface Props {
  loading: boolean
  projects?: Pick<Project, 'id' | 'name' | 'code' | 'description'>[]
}

export default function ProjectsList({ loading, projects }: Props) {
  return (
    <PageContent>
      <Skeleton active loading={loading}>
        <Title>Projects</Title>
        <ProjectGroup projects={projects} code="is-" title="Internal Sidenis" />
        <ProjectGroup projects={projects} code="guild-" title="Guild" />
        <ProjectGroup projects={projects} code="az-" title="Allianz" />
        <ProjectGroup projects={projects} code="sr-" title="SwissRe" />
      </Skeleton>
    </PageContent>
  )
}
