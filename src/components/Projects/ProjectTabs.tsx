import React from 'react'
import { Project } from '../../types'
import Tabs from '../UI/Tabs'
import ProjectEmployees from './ProjectEmployees'

interface Props {
  tab: string
  project: Pick<Project, 'id'>
}

export default function ProjectTabs(props: Props) {
  let tabs = [
    {
      title: 'Employees',
      icon: 'user',
      key: 'employees',
      body: <ProjectEmployees project={props.project} />,
    },
    {
      title: 'Managers',
      icon: 'user-add',
      key: 'managers',
      body: <div>Managers</div>,
    },
    {
      title: 'Skills',
      icon: 'crown',
      key: 'skills',
      body: <div>Skills</div>,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}
