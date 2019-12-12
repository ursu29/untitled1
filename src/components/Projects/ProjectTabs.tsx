import React from 'react'
import { Project } from '../../types'
import Tabs from '../UI/Tabs'

interface Props {
  tab: string
  project: Pick<Project, 'id'>
}

export default function ProjectTabs(props: Props) {
  let tabs = [
    {
      title: 'Employees',
      key: 'employees',
      body: <div>Employees</div>,
    },
    {
      title: 'Managers',
      key: 'managers',
      body: <div>Managers</div>,
    },
    {
      title: 'Skills',
      key: 'skills',
      body: <div>Skills</div>,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}
