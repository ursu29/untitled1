import React from 'react'
import { TeamOutlined, CrownOutlined } from '@ant-design/icons'
import { Project } from '../../types'
import Tabs from '../UI/Tabs'
import ProjectEmployees from './ProjectEmployees'
import ProjectSkills from './ProjectSkills'

interface Props {
  tab: string
  project: Pick<Project, 'id'>
}

export default function ProjectTabs(props: Props) {
  let tabs = [
    {
      title: 'Employees',
      icon: <TeamOutlined />,
      key: 'employees',
      body: <ProjectEmployees project={props.project} />,
    },
    {
      title: 'Skills',
      icon: <CrownOutlined />,
      key: 'skills',
      body: <ProjectSkills project={props.project} />,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}
