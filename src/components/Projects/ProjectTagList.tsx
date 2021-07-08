import { Button, Skeleton } from 'antd'
import React from 'react'
import { EmployeeProject, Project } from '../../types'
import ProjectTag from './ProjectTag'
import './ProjectTagList.css'
import { debounce } from 'throttle-debounce'

type ProjectPick = Pick<Project, 'id' | 'code' | 'name'>

interface Props {
  loading?: boolean
  small?: boolean
  projects?: ProjectPick[]
  employeeProjects?: EmployeeProject[]
}

export default function ProjectTagList({ loading, small, projects, employeeProjects }: Props) {
  const [showMoreVisible, setShowMoreVisible] = React.useState(false)
  const [showMore, setShowMore] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleResize = debounce(100, () => {
      if (ref.current) {
        if (ref.current.scrollHeight > ref.current.offsetHeight) {
          setShowMoreVisible(true)
        } else {
          setShowMoreVisible(false)
        }
      }
    })
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!projects?.length) {
    return <div data-cy="no_project">No projects</div>
  }

  return (
    <Skeleton
      loading={loading}
      active
      paragraph={{
        rows: 1,
      }}
    >
      <div
        style={{ marginBottom: 16 }}
        data-cy="project"
        ref={ref}
        className={`project-tag-list ${showMore ? 'expanded' : ''}`}
      >
        <div>
          <div
            className="project-tag-list-show-more-button"
            style={{ visibility: showMoreVisible ? 'visible' : 'hidden' }}
          >
            <Button type="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </Button>
          </div>
          {projects.map(project => {
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
          })}
        </div>
      </div>
    </Skeleton>
  )
}
