import { Skeleton, Typography, Tooltip } from 'antd'
import React from 'react'
import { Project } from '../../types'
import PageContent from '../UI/PageContent'
import ProjectTagList from './ProjectTagList'
import Section from '../UI/Section'

const { Title } = Typography

interface ProjectGroupProps {
  title: string
  code: string
  projects: Props['projects']
}

const ProjectGroup = ({ title, projects, code }: ProjectGroupProps) => {
  const projectsFiltered = projects?.filter(project => {
    if (project.code === 'is-administrations') return false
    return project.code.toLowerCase().startsWith(code.toLowerCase())
  })

  if (!projectsFiltered) return null

  return (
    <Section
      title={
        <Tooltip
          placement="right"
          title={`${projectsFiltered.length} ${
            projectsFiltered.length === 1 ? 'project' : 'projects'
          }`}
        >
          <Typography.Text style={{ userSelect: 'none' }}>{title}</Typography.Text>
        </Tooltip>
      }
    >
      <ProjectTagList projects={projectsFiltered} />
    </Section>
  )
}

interface Props {
  loading: boolean
  projects?: Pick<Project, 'id' | 'name' | 'code' | 'description'>[]
}

export default function ProjectsList({ loading, projects }: Props) {
  const projectsSorted = projects?.sort((a: any, b: any) =>
    a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1,
  )
  return (
    <PageContent>
      <Skeleton active loading={loading}>
        <Title>Projects</Title>
        <ProjectGroup projects={projectsSorted} code="sr-" title="SwissRe" />
        <ProjectGroup projects={projectsSorted} code="is-" title="Internal Sidenis" />
        <ProjectGroup projects={projectsSorted} code="guild-" title="Guild" />
        <ProjectGroup projects={projectsSorted} code="az-" title="Allianz" />
      </Skeleton>
    </PageContent>
  )
}
