import { Skeleton } from 'antd'
import React from 'react'
import { Project, EmployeeProject } from '../../types'
import ProjectTag from './ProjectTag'

type ProjectPick = Pick<Project, 'id' | 'code' | 'name'>

interface Props {
  loading?: boolean
  small?: boolean
  projects?: ProjectPick[]
  employeeProjects?: EmployeeProject[]
}

export default function ProjectTagList({ loading, small, projects, employeeProjects }: Props) {
  // if (!loading && !projects) return null
  return (
    <div style={{ marginBottom: 16 }} data-cy="project">
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
              const employeeProject = employeeProjects?.find(e => e.project.id === project.id)

              return (
                <div
                  key={project.id}
                  style={{ marginBottom: 8, display: 'inline-block' }}
                  data-cy="project_tab"
                >
                  <ProjectTag
                    small={small}
                    project={project}
                    capacity={employeeProject?.capacity}
                    isExtraCapacity={employeeProject?.isExtraCapacity}
                  />
                </div>
              )
            })
          ) : (
            <div data-cy="no_project">No projects</div>
          ))}
      </Skeleton>
    </div>
  )
}
