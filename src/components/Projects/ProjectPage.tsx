import { CrownOutlined, TeamOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import query, { QueryType } from '../../queries/getProjectByCode'
import PageContent from '../UI/PageContent'
import Tabs from '../UI/Tabs'
import Project from './Project'
import ProjectEmployees from './ProjectEmployees'
import ProjectSkills from './ProjectSkills'
import ProjectTechnologies from './ProjectTechnologies'
import PageHeader from '../UI/PageHeader'
import UpdateProject from './UpdateProject'

interface Props extends RouteComponentProps<{ code: string; tab: string }> {}

function ProjectPage({ match }: Props) {
  const { code, tab } = match.params
  const { data, loading, error } = useQuery<QueryType>(query, { variables: { code } })

  if (error) return <div>Error :(</div>
  if (!data) return null

  const project = data?.projectByCode
  if (!project) return <div>Project is not found</div>

  let tabs = [
    {
      title: 'Employees',
      icon: <TeamOutlined />,
      key: 'employees',
      body: <ProjectEmployees project={project} />,
    },
    {
      title: 'Skills',
      icon: <CrownOutlined />,
      key: 'skills',
      body: <ProjectSkills project={project} />,
    },
  ]

  return (
    <>
      <PageHeader title={project.name} withBack extra={[<UpdateProject project={project} />]} />
      <PageContent loading={loading || !data}>
        <Project loading={loading} project={project} />
        <ProjectTechnologies project={project} />
      </PageContent>
      <Tabs tabs={tabs} tab={tab} />
    </>
  )
}

export default withRouter(ProjectPage)
